// Konfigurasi Google Sheets - GANTI DENGAN URL ANDA
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxit8_OLXoHVIDU92QsxwY9ryscMEyLVAUj303N3UEpLz5f55g7ZG4_dKWADuJnXOEHrw/exec';

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Initializing comment system');
    loadComments();
    setupRatingStars();
    setupFormSubmission();
    setupScrollToTop();
});

// Setup rating stars
function setupRatingStars() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    const ratingText = document.querySelector('.rating-text');
    
    console.log('Setting up rating stars:', stars.length);
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            ratingInput.value = value;
            
            // Update tampilan bintang
            stars.forEach(s => {
                s.classList.remove('active', 'selected');
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('active', 'selected');
                }
            });
            
            // Update text
            const ratingTexts = {
                1: 'Tidak Puas',
                2: 'Kurang Puas', 
                3: 'Cukup Puas',
                4: 'Puas',
                5: 'Sangat Puas'
            };
            ratingText.textContent = ratingTexts[value] || 'Pilih rating dengan mengklik bintang';
            
            console.log('Rating selected:', value);
        });
        
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                s.classList.remove('hover');
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('hover');
                }
            });
        });
    });
    
    // Reset hover effect
    document.querySelector('.rating-stars').addEventListener('mouseleave', function() {
        const currentRating = parseInt(ratingInput.value) || 0;
        stars.forEach(s => {
            s.classList.remove('hover');
            if (parseInt(s.getAttribute('data-value')) <= currentRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('commentForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        if (!validateForm()) {
            return;
        }
        
        submitComment();
    });
}

// Setup scroll to top button
function setupScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    const commentsList = document.getElementById('commentsList');
    
    // Show/hide scroll button based on scroll position
    commentsList.addEventListener('scroll', function() {
        if (commentsList.scrollTop > 100) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });
    
    // Scroll to top when button clicked
    scrollButton.addEventListener('click', function() {
        commentsList.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Validasi form
function validateForm() {
    const nama = document.getElementById('nama').value.trim();
    const kontak = document.getElementById('kontak').value.trim();
    const rating = document.getElementById('rating').value;
    const komentar = document.getElementById('komentar').value.trim();
    
    console.log('Validating form:', { nama, kontak, rating, komentar });
    
    let errors = [];
    
    if (!nama) errors.push('Nama harus diisi');
    if (!kontak) errors.push('Email/Media sosial harus diisi');
    if (!rating) errors.push('Rating harus dipilih');
    if (!komentar) errors.push('Komentar harus diisi');
    
    if (errors.length > 0) {
        alert('Error:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

// Submit komentar ke Google Sheets
function submitComment() {
    const formData = new FormData(document.getElementById('commentForm'));
    const data = {
        nama: formData.get('nama'),
        kontak: formData.get('kontak'),
        rating: formData.get('rating'),
        komentar: formData.get('komentar')
    };
    
    console.log('Submitting data:', data);
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    // Gunakan FormData untuk menghindari CORS issues
    const formDataToSend = new FormData();
    formDataToSend.append('nama', data.nama);
    formDataToSend.append('kontak', data.kontak);
    formDataToSend.append('rating', data.rating);
    formDataToSend.append('komentar', data.komentar);
    
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: formDataToSend
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(result => {
        console.log('Response result:', result);
        
        if (result.status === 'success') {
            alert('✓ ' + result.message);
            // Reset form
            document.getElementById('commentForm').reset();
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active', 'selected');
            });
            document.getElementById('rating').value = '';
            document.querySelector('.rating-text').textContent = 'Pilih rating dengan mengklik bintang';
            
            // Reload comments setelah 1 detik
            setTimeout(() => {
                loadComments();
                // Scroll ke atas setelah reload
                const commentsList = document.getElementById('commentsList');
                commentsList.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 1000);
        } else {
            throw new Error(result.message || 'Terjadi kesalahan tidak diketahui');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('❌ Gagal mengirim komentar: ' + error.message);
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Load komentar dari Google Sheets
function loadComments() {
    console.log('Loading comments from:', SCRIPT_URL);
    
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '<div class="loading">Memuat komentar...</div>';
    
    fetch(SCRIPT_URL)
    .then(response => {
        console.log('Comments response status:', response.status);
        return response.json();
    })
    .then(comments => {
        console.log('Comments loaded:', comments);
        displayComments(comments);
    })
    .catch(error => {
        console.error('Error loading comments:', error);
        document.getElementById('commentsList').innerHTML = 
            '<div class="error">Gagal memuat komentar: ' + error.message + '</div>';
    });
}

// Tampilkan komentar
function displayComments(comments) {
    const commentsList = document.getElementById('commentsList');
    
    if (!comments) {
        commentsList.innerHTML = '<div class="error">Tidak ada data yang diterima</div>';
        return;
    }
    
    if (comments.status === 'error') {
        commentsList.innerHTML = '<div class="error">Error: ' + comments.message + '</div>';
        return;
    }
    
    if (!Array.isArray(comments)) {
        commentsList.innerHTML = '<div class="error">Format data tidak valid</div>';
        return;
    }
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="no-comments">Belum ada komentar. Jadilah yang pertama!</div>';
        return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <div class="comment-author">${escapeHtml(comment.nama)}</div>
                <div class="comment-date">${formatDate(comment.tanggal)}</div>
            </div>
            <div class="comment-rating">
                ${generateStars(parseInt(comment.rating))}
                <span class="rating-value">${comment.rating}/5</span>
            </div>
            <div class="comment-text">${escapeHtml(comment.komentar)}</div>
        </div>
    `).join('');
    
    // Tambahkan animasi untuk komentar terbaru
    const firstComment = commentsList.querySelector('.comment-item:first-child');
    if (firstComment) {
        firstComment.classList.add('new-comment');
    }
}

// Generate bintang untuk rating
function generateStars(rating) {
    if (!rating || rating < 1 || rating > 5) return '';
    
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star active">★</span>';
        } else {
            stars += '<span class="star">☆</span>';
        }
    }
    return stars;
}

// Format tanggal
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Tanggal tidak valid';
        }
        
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Hari ini ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays === 1) {
            return 'Kemarin ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        } else if (diffDays < 7) {
            return diffDays + ' hari yang lalu';
        } else {
            return date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    } catch (error) {
        return 'Tanggal tidak valid';
    }
}

// Escape HTML untuk mencegah XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}