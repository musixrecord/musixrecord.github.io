// ===== CONFIGURATION =====
const CONFIG = {
    SPREADSHEET_ID: '1XWRwk4gj_PYM8t1igu4zQazJmcfRymyUdwPR0nBbW5o',
    API_KEY: 'AIzaSyAocpfct1GsvOvQrBEVeAAuPnzqsIwb8FY',
    SHEET_NAME: 'Gallery'
};

// ===== DOM ELEMENTS =====
const DOM = {
    // Existing elements
    galleryGrid: document.getElementById('galleryGrid'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    mediaTypeButtons: document.querySelectorAll('.media-type-btn'),
    lightbox: document.getElementById('lightbox'),
    lightboxMedia: document.getElementById('lightboxMedia'),
    lightboxTitle: document.getElementById('lightboxTitle'),
    lightboxDescription: document.getElementById('lightboxDescription'),
    lightboxType: document.getElementById('lightboxType'),
    lightboxDate: document.getElementById('lightboxDate'),
    lightboxClose: document.getElementById('lightboxClose'),
    lightboxPrev: document.getElementById('lightboxPrev'),
    lightboxNext: document.getElementById('lightboxNext'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    refreshBtn: document.getElementById('refreshBtn'),
    connectionStatus: document.getElementById('connectionStatus'),
    
    // Video Modal elements
    videoModal: document.getElementById('videoModal'),
    youtubePlayer: document.getElementById('youtubePlayer'),
    closeModal: document.getElementById('closeModal'),
    videoPrev: document.getElementById('videoPrev'),
    videoNext: document.getElementById('videoNext'),
    videoTitle: document.getElementById('videoTitle'),
    videoDescription: document.getElementById('videoDescription'),
    videoDate: document.getElementById('videoDate'),
    videoCounter: document.getElementById('videoCounter'),
};

// ===== STATE MANAGEMENT =====
class GalleryState {
    constructor() {
        this.currentFilter = 'all';
        this.currentMediaType = 'all';
        this.currentImageIndex = 0;
        this.currentVideoIndex = 0;
        this.galleryData = [];
        this.filteredMedia = [];
        this.filteredVideos = [];
        this.isLoading = false;
    }
}

const state = new GalleryState();

// ===== GALLERY APP =====
class GalleryApp {
    constructor() {
        this.init();
    }

    async init() {
        this.showLoading();
        this.setupEventListeners();
        
        try {
            await this.loadGalleryData();
            this.updateConnectionStatus('connected');
        } catch (error) {
            console.error('Failed to load gallery data:', error);
            await this.loadFallbackData();
            this.updateConnectionStatus('error');
        } finally {
            this.hideLoading();
        }
    }
    // ===== DATA MANAGEMENT =====
    async loadGalleryData() {
        if (!CONFIG.SPREADSHEET_ID || CONFIG.SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
            throw new Error('Spreadsheet ID not configured');
        }

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}/values/${CONFIG.SHEET_NAME}?key=${CONFIG.API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        state.galleryData = this.parseSheetData(data.values);
        this.renderGallery();
    }

    parseSheetData(sheetData) {
        if (!sheetData || sheetData.length < 2) {
            return [];
        }
        
        const headers = sheetData[0].map(header => 
            header.toLowerCase().replace(/\s+/g, '_')
        );
        
        return sheetData.slice(1).map((row, index) => {
            const item = { id: index + 1 };
            
            headers.forEach((header, colIndex) => {
                item[header] = row[colIndex] || '';
            });
            
            // Ensure required fields
            item.type = item.type || 'image';
            item.src = item.src || '';
            item.thumbnail = item.thumbnail || item.src;
            item.title = item.title || 'Untitled';
            item.description = item.description || '';
            item.category = item.category || 'uncategorized';
            item.date = item.date || new Date().toISOString().split('T')[0];
            item.youtube_id = item.youtube_id || this.extractYouTubeId(item.src);
            
            return item;
        });
    }

    async loadFallbackData() {
        // Fallback data dengan beberapa video YouTube
        state.galleryData = [
            {
                id: 1,
                type: 'image',
                src: 'assets/gallery/studio-1.jpg',
                thumbnail: 'assets/gallery/thumbnails/studio-1-thumb.jpg',
                title: 'Studio Recording Setup',
                description: 'Peralatan recording profesional dengan akustik yang optimal',
                category: 'studio',
                date: '2024-01-15'
            },
            {
                id: 2,
                type: 'video',
                src: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
                thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
                title: 'YouTube Demo Video',
                description: 'Video demo pertama yang diupload ke YouTube - Me at the zoo',
                category: 'studio',
                date: '2024-01-10',
                youtube_id: 'jNQXAC9IVRw'
            },
            {
                id: 3,
                type: 'video',
                src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                title: 'Contoh Video Musik 1',
                description: 'Contoh hasil mixing dan mastering musik pop',
                category: 'session',
                date: '2024-01-08',
                youtube_id: 'dQw4w9WgXcQ'
            },
            {
                id: 4,
                type: 'video',
                src: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
                thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
                title: 'Contoh Video Musik 2',
                description: 'Proses recording session di studio',
                category: 'session',
                date: '2024-01-05',
                youtube_id: '9bZkp7q19f0'
            },
            {
                id: 5,
                type: 'image',
                src: 'assets/gallery/equipment-1.jpg',
                thumbnail: 'assets/gallery/thumbnails/equipment-1-thumb.jpg',
                title: 'Microphone Collection',
                description: 'Koleksi microphone profesional untuk berbagai kebutuhan recording',
                category: 'equipment',
                date: '2024-01-03'
            }
        ];
        this.renderGallery();
    }

    // ===== RENDERING =====
    renderGallery() {
        this.applyFilters();
        
        if (state.filteredMedia.length === 0) {
            this.showEmptyState();
            return;
        }
        
        DOM.galleryGrid.innerHTML = state.filteredMedia
            .map((media, index) => this.createMediaItem(media, index))
            .join('');
        
        this.setupMediaEventListeners();
    }

createMediaItem(media, index) {
    const isVideo = media.type === 'video';
    const youtubeId = media.youtube_id || this.extractYouTubeId(media.src);
    const thumbnail = isVideo 
        ? (media.thumbnail || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`)
        : media.thumbnail;
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isVideo) {
        return `
            <div class="video-item" data-category="${media.category}" data-index="${index}" data-youtube-id="${youtubeId}">
                <img src="${thumbnail}" alt="${media.title}" class="video-thumbnail" loading="lazy">
                <div class="video-play-button">
                    <i class="fas fa-play"></i>
                </div>
                ${media.duration ? `<span class="video-duration">${media.duration}</span>` : ''}
                <div class="video-overlay ${isMobile ? 'mobile-visible' : ''}">
                    <div class="overlay-header">
                        <span class="gallery-category">${this.getCategoryName(media.category)}</span>
                        <span class="media-type-badge video">Video</span>
                    </div>
                    <h3 class="gallery-title">${media.title}</h3>
                    <p class="gallery-description">${media.description}</p>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="gallery-item" data-category="${media.category}" data-index="${index}">
                <img src="${thumbnail}" alt="${media.title}" class="gallery-image" loading="lazy">
                <div class="gallery-overlay ${isMobile ? 'mobile-visible' : ''}">
                    <div class="overlay-header">
                        <span class="gallery-category">${this.getCategoryName(media.category)}</span>
                        <span class="media-type-badge image">Foto</span>
                    </div>
                    <h3 class="gallery-title">${media.title}</h3>
                    <p class="gallery-description">${media.description}</p>
                </div>
            </div>
        `;
    }
}

    showEmptyState() {
        DOM.galleryGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-images"></i>
                <h3>Tidak ada media</h3>
                <p>Tidak ditemukan media untuk filter "${this.getCategoryName(state.currentFilter)}" dan tipe "${this.getMediaTypeName(state.currentMediaType)}"</p>
            </div>
        `;
    }

    // ===== VIDEO MANAGEMENT =====
    openVideoModal(videoIndex) {
        // Get filtered videos only
        const videos = state.filteredMedia.filter(item => item.type === 'video');
        
        if (videos.length === 0) {
            console.error('Tidak ada video yang tersedia');
            return;
        }

        state.currentVideoIndex = videoIndex;
        const currentVideo = videos[state.currentVideoIndex];
        
        if (!currentVideo || !currentVideo.youtube_id) {
            console.error('Data video tidak valid');
            return;
        }

        // Set YouTube embed URL
        DOM.youtubePlayer.src = `https://www.youtube.com/embed/${currentVideo.youtube_id}?autoplay=1&rel=0&modestbranding=1`;
        
        // Update video info
        DOM.videoTitle.textContent = currentVideo.title;
        DOM.videoDescription.textContent = currentVideo.description;
        DOM.videoDate.textContent = this.formatDate(currentVideo.date);
        DOM.videoCounter.textContent = `${state.currentVideoIndex + 1} / ${videos.length}`;
        
        // Update navigation buttons state
        this.updateVideoNavigation(videos.length);
        
        // Show modal
        DOM.videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeVideoModal() {
        // Stop video
        DOM.youtubePlayer.src = '';
        
        // Hide modal
        DOM.videoModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset video index
        state.currentVideoIndex = 0;
    }

    navigateVideo(direction) {
        const videos = state.filteredMedia.filter(item => item.type === 'video');
        
        if (videos.length <= 1) return;
        
        state.currentVideoIndex = (state.currentVideoIndex + direction + videos.length) % videos.length;
        const currentVideo = videos[state.currentVideoIndex];
        
        // Update YouTube embed URL
        DOM.youtubePlayer.src = `https://www.youtube.com/embed/${currentVideo.youtube_id}?autoplay=1&rel=0&modestbranding=1`;
        
        // Update video info
        DOM.videoTitle.textContent = currentVideo.title;
        DOM.videoDescription.textContent = currentVideo.description;
        DOM.videoDate.textContent = this.formatDate(currentVideo.date);
        DOM.videoCounter.textContent = `${state.currentVideoIndex + 1} / ${videos.length}`;
        
        // Update navigation buttons state
        this.updateVideoNavigation(videos.length);
    }

    updateVideoNavigation(totalVideos) {
        // Show/hide navigation based on video count
        if (totalVideos <= 1) {
            DOM.videoPrev.style.display = 'none';
            DOM.videoNext.style.display = 'none';
        } else {
            DOM.videoPrev.style.display = 'flex';
            DOM.videoNext.style.display = 'flex';
            
            // Disable buttons when at boundaries
            DOM.videoPrev.disabled = state.currentVideoIndex === 0;
            DOM.videoNext.disabled = state.currentVideoIndex === totalVideos - 1;
        }
    }

    // ===== LIGHTBOX MANAGEMENT =====
    openLightbox(index) {
        state.currentImageIndex = index;
        const media = state.filteredMedia[index];
        
        DOM.lightboxMedia.innerHTML = `
            <img src="${media.src}" alt="${media.title}" class="lightbox-image">
        `;
        
        DOM.lightboxTitle.textContent = media.title;
        DOM.lightboxDescription.textContent = media.description;
        DOM.lightboxType.textContent = 'Foto';
        DOM.lightboxType.className = 'media-type-badge image';
        DOM.lightboxDate.textContent = this.formatDate(media.date);
        
        DOM.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        DOM.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    navigateLightbox(direction) {
        state.currentImageIndex = (state.currentImageIndex + direction + state.filteredMedia.length) % state.filteredMedia.length;
        const media = state.filteredMedia[state.currentImageIndex];
        
        if (media.type === 'video') {
            this.closeLightbox();
            // Find video index in filtered videos
            const videos = state.filteredMedia.filter(item => item.type === 'video');
            const videoIndex = videos.findIndex(video => video.id === media.id);
            this.openVideoModal(videoIndex);
        } else {
            this.openLightbox(state.currentImageIndex);
        }
    }

    // ===== UTILITY FUNCTIONS =====
    extractYouTubeId(url) {
        if (!url) return '';
        
        const patterns = [
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
            /youtube\.com\/embed\/([^"&?\/\s]{11})/,
            /youtube\.com\/watch\?v=([^"&?\/\s]{11})/,
            /youtu\.be\/([^"&?\/\s]{11})/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        return '';
    }

    getCategoryName(category) {
        const categories = {
            'all': 'Semua',
            'achievements': 'Penghargaan',
            'artwork': 'Karya Seni',
            'studio': 'Studio',
            'equipment': 'Equipment',
            'session': 'Recording Session',
            'live': 'Live Performance',
            'client': 'Client Session',
            'uncategorized': 'Lainnya'
        };
        return categories[category] || category;
    }

    getMediaTypeName(type) {
        const types = {
            'all': 'Semua',
            'image': 'Foto',
            'video': 'Video'
        };
        return types[type] || type;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // ===== FILTERING =====
    applyFilters() {
        state.filteredMedia = state.galleryData.filter(item => {
            const categoryMatch = state.currentFilter === 'all' || item.category === state.currentFilter;
            const typeMatch = state.currentMediaType === 'all' || item.type === state.currentMediaType;
            return categoryMatch && typeMatch;
        });
    }

    filterGallery(category) {
        state.currentFilter = category;
        this.updateActiveFilterButtons();
        this.renderGallery();
    }

    filterMediaType(type) {
        state.currentMediaType = type;
        this.updateActiveMediaTypeButtons();
        this.renderGallery();
    }

    updateActiveFilterButtons() {
        DOM.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === state.currentFilter);
        });
    }

    updateActiveMediaTypeButtons() {
        DOM.mediaTypeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === state.currentMediaType);
        });
    }

    // ===== UI STATE MANAGEMENT =====
    showLoading() {
        state.isLoading = true;
        DOM.loadingSpinner.style.display = 'flex';
        DOM.galleryGrid.style.display = 'none';
    }

    hideLoading() {
        state.isLoading = false;
        DOM.loadingSpinner.style.display = 'none';
        DOM.galleryGrid.style.display = 'grid';
    }

updateConnectionStatus(status) {
    // Reset kelas dan tampilkan
    DOM.connectionStatus.className = 'connection-status';
    DOM.connectionStatus.classList.add('show');
    
    // Clear timeout sebelumnya jika ada
    if (this.connectionStatusTimeout) {
        clearTimeout(this.connectionStatusTimeout);
    }
    
    switch (status) {
        case 'connected':
            DOM.connectionStatus.innerHTML = '<i class="fas fa-wifi"></i><span>Terhubung</span>';
            break;
        case 'error':
            DOM.connectionStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Menggunakan data lokal</span>';
            DOM.connectionStatus.classList.add('error');
            break;
        case 'offline':
            DOM.connectionStatus.innerHTML = '<i class="fas fa-wifi-slash"></i><span>Mode offline</span>';
            DOM.connectionStatus.classList.add('offline');
            break;
    }
    
    // Auto hide setelah 5 detik
    this.connectionStatusTimeout = setTimeout(() => {
        DOM.connectionStatus.classList.remove('show');
    }, 5000);
}

    // ===== EVENT HANDLERS =====
    setupEventListeners() {
        // Filter buttons
        DOM.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterGallery(btn.dataset.filter);
            });
        });
        
        // Media type buttons
        DOM.mediaTypeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterMediaType(btn.dataset.type);
            });
        });
        
        // Lightbox controls
        DOM.lightboxClose.addEventListener('click', () => this.closeLightbox());
        DOM.lightboxPrev.addEventListener('click', () => this.navigateLightbox(-1));
        DOM.lightboxNext.addEventListener('click', () => this.navigateLightbox(1));
        
        // Video modal controls
        DOM.closeModal.addEventListener('click', () => this.closeVideoModal());
        DOM.videoPrev.addEventListener('click', () => this.navigateVideo(-1));
        DOM.videoNext.addEventListener('click', () => this.navigateVideo(1));
        
        // Refresh button
        DOM.refreshBtn.addEventListener('click', () => this.refreshGallery());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Close modals when clicking outside
        DOM.lightbox.addEventListener('click', (e) => {
            if (e.target === DOM.lightbox) this.closeLightbox();
        });
        
        DOM.videoModal.addEventListener('click', (e) => {
            if (e.target === DOM.videoModal) this.closeVideoModal();
        });
    }

    setupMediaEventListeners() {
        document.querySelectorAll('.gallery-item, .video-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                if (item.classList.contains('video-item')) {
                    // Find video index in filtered videos
                    const videos = state.filteredMedia.filter(item => item.type === 'video');
                    const videoIndex = videos.findIndex(video => 
                        video.youtube_id === item.dataset.youtubeId
                    );
                    if (videoIndex !== -1) {
                        this.openVideoModal(videoIndex);
                    }
                } else {
                    this.openLightbox(index);
                }
            });
        });
    }

    handleKeyboard(e) {
        if (DOM.lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    this.navigateLightbox(1);
                    break;
            }
        }
        
        if (DOM.videoModal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    this.closeVideoModal();
                    break;
                case 'ArrowLeft':
                    this.navigateVideo(-1);
                    break;
                case 'ArrowRight':
                    this.navigateVideo(1);
                    break;
            }
        }
    }

    // ===== DATA REFRESH =====
    async refreshGallery() {
        DOM.refreshBtn.classList.add('loading');
        this.showLoading();
        
        try {
            await this.loadGalleryData();
            this.updateConnectionStatus('connected');
        } catch (error) {
            console.error('Error refreshing gallery:', error);
            this.updateConnectionStatus('error');
        } finally {
            DOM.refreshBtn.classList.remove('loading');
            this.hideLoading();
        }
    }
}

// ===== INITIALIZE GALLERY =====
document.addEventListener('DOMContentLoaded', () => {
    new GalleryApp();
});

