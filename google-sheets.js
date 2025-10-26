// Google Sheets Integration for Comments
class GoogleSheetsIntegration {
    constructor() {
        // Ganti dengan URL Web App Anda setelah deploy
        this.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXj489t4Z0nR05Wcd5qbqMOBNda0bpqgSZwz6DvrQnOes5B4-kcwNwTGhorC_7Z_NUWg/exec';
        this.comments = [];
    }

    // Submit komentar baru
    async submitComment(commentData) {
        try {
            console.log('🔄 Mengirim komentar:', commentData);
            
            const response = await fetch(this.SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'ADD_COMMENT',
                    data: commentData
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('✅ Response dari server:', result);
            
            if (result.success) {
                return { 
                    success: true, 
                    message: 'Komentar berhasil dikirim! Terima kasih atas masukan Anda.' 
                };
            } else {
                return { 
                    success: false, 
                    message: result.message || 'Gagal mengirim komentar. Silakan coba lagi.' 
                };
            }
        } catch (error) {
            console.error('❌ Error mengirim komentar:', error);
            return { 
                success: false, 
                message: 'Koneksi internet bermasalah. Silakan coba lagi nanti.' 
            };
        }
    }

    // Ambil komentar dari Google Sheets
    async loadComments() {
        try {
            console.log('🔄 Memuat komentar...');
            
            const response = await fetch(`${this.SCRIPT_URL}?action=GET_COMMENTS&t=${Date.now()}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('✅ Data komentar diterima:', result);
            
            if (result.success) {
                this.comments = result.data || [];
                console.log(`📊 ${this.comments.length} komentar dimuat`);
                return this.comments;
            } else {
                throw new Error(result.message || 'Gagal memuat komentar');
            }
        } catch (error) {
            console.error('❌ Error memuat komentar:', error);
            // Kembalikan data sample untuk testing
            return this.getSampleComments();
        }
    }

    // Data sample untuk testing
    getSampleComments() {
        return [
            {
                Timestamp: '2024-01-15T10:30:00.000Z',
                Nama: 'Andi Pratama',
                Email: 'andi@example.com',
                WhatsApp: '08123456789',
                Rating: '⭐⭐⭐⭐⭐',
                Komentar: 'Hasil mixing dan mastering lagu saya sangat memuaskan! Suara menjadi lebih jelas dan powerful. Tim Musix Record sangat profesional.',
                Status: 'Approved'
            },
            {
                Timestamp: '2024-01-14T15:20:00.000Z',
                Nama: 'Sari Dewi',
                Email: 'sari@example.com',
                WhatsApp: '08129876543',
                Rating: '⭐⭐⭐⭐',
                Komentar: 'Proses aransemen musiknya cepat dan hasilnya sesuai ekspektasi. Harga juga sangat reasonable untuk kualitas yang diberikan.',
                Status: 'Approved'
            },
            {
                Timestamp: '2024-01-13T09:15:00.000Z',
                Nama: 'Budi Santoso',
                Email: 'budi@example.com',
                WhatsApp: '08111222333',
                Rating: '⭐⭐⭐⭐⭐',
                Komentar: 'Pelayanan sangat baik dan hasilnya beyond expectation. Recommended banget untuk yang serius mau produksi musik berkualitas!',
                Status: 'Approved'
            }
        ];
    }

    // Tampilkan komentar di halaman
    displayComments(comments = null) {
        const commentsToDisplay = comments || this.comments;
        const container = document.getElementById('comments-container');
        
        if (!container) {
            console.error('❌ Container komentar tidak ditemukan');
            return;
        }

        // Filter hanya komentar yang approved
        const approvedComments = commentsToDisplay.filter(comment => {
            const status = comment.Status || comment.status || '';
            return status.toString().toLowerCase() === 'approved';
        });

        console.log(`🎯 Menampilkan ${approvedComments.length} komentar approved`);

        if (approvedComments.length === 0) {
            container.innerHTML = `
                <div class="no-comments">
                    <i class="fas fa-comments"></i>
                    <h4>Belum ada komentar</h4>
                    <p>Jadilah yang pertama berkomentar!</p>
                </div>
            `;
            return;
        }

        // Urutkan berdasarkan timestamp terbaru
        approvedComments.sort((a, b) => {
            const dateA = new Date(a.Timestamp || a.timestamp || 0);
            const dateB = new Date(b.Timestamp || b.timestamp || 0);
            return dateB - dateA;
        });

        container.innerHTML = approvedComments.map((comment, index) => {
            const nama = comment.Nama || comment.nama || 'Anonymous';
            const komentar = comment.Komentar || comment.komentar || '';
            const rating = comment.Rating || comment.rating || '';
            const timestamp = comment.Timestamp || comment.timestamp;
            
            return `
                <div class="comment" data-comment-id="${index}">
                    <div class="comment-header">
                        <div class="comment-author">
                            <i class="fas fa-user"></i>
                            ${this.escapeHtml(nama)}
                        </div>
                        <div class="comment-meta">
                            ${rating ? `<span class="comment-rating">${rating}</span>` : ''}
                            <span class="comment-date">
                                <i class="fas fa-clock"></i>
                                ${this.formatDate(timestamp)}
                            </span>
                        </div>
                    </div>
                    <div class="comment-text">
                        <i class="fas fa-quote-left"></i>
                        ${this.escapeHtml(komentar)}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Helper functions
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(timestamp) {
        if (!timestamp) return 'Baru saja';
        
        try {
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            
            if (diffMins < 1) return 'Baru saja';
            if (diffMins < 60) return `${diffMins} menit lalu`;
            if (diffHours < 24) return `${diffHours} jam lalu`;
            if (diffDays === 1) return 'Kemarin';
            if (diffDays < 7) return `${diffDays} hari lalu`;
            
            return date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'Tanggal tidak valid';
        }
    }
}

// Initialize Google Sheets Integration
const sheetsIntegration = new GoogleSheetsIntegration();

// Initialize comments system
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Memulai sistem komentar...');
    initializeComments();
});

function initializeComments() {
    const commentForm = document.getElementById('commentForm');
    
    // Load komentar yang ada
    loadAndDisplayComments();
    
    // Setup form handler
    if (commentForm) {
        console.log('✅ Form komentar ditemukan');
        setupCommentForm(commentForm);
    }
    
    // Initialize rating stars
    initRatingStars();
}

async function loadAndDisplayComments() {
    const container = document.getElementById('comments-container');
    
    if (container) {
        container.innerHTML = `
            <div class="loading-comments">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Memuat komentar...</p>
            </div>
        `;
    }
    
    try {
        const comments = await sheetsIntegration.loadComments();
        sheetsIntegration.displayComments(comments);
        console.log('✅ Komentar berhasil ditampilkan');
    } catch (error) {
        console.error('❌ Gagal memuat komentar:', error);
        if (container) {
            container.innerHTML = `
                <div class="no-comments">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Gagal memuat komentar</h4>
                    <p>Silakan refresh halaman</p>
                </div>
            `;
        }
    }
}

function setupCommentForm(commentForm) {
    commentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📤 Mengirim komentar...');
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalHTML = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitButton.disabled = true;

        // Get form data
        const formData = new FormData(this);
        const commentData = {
            Timestamp: new Date().toISOString(),
            Nama: (formData.get('name') || '').trim(),
            Email: (formData.get('email') || '').trim(),
            WhatsApp: (formData.get('whatsapp') || '').trim(),
            Rating: formData.get('rating') || '⭐⭐⭐⭐⭐',
            Komentar: (formData.get('comment') || '').trim(),
            Status: 'Pending'
        };

        console.log('📝 Data komentar:', commentData);

        // Validation
        if (!commentData.Nama || commentData.Nama.length < 2) {
            showMessage('Nama harus diisi (minimal 2 karakter)', 'error');
            resetSubmitButton(submitButton, originalHTML);
            return;
        }

        if (!commentData.Komentar || commentData.Komentar.length < 10) {
            showMessage('Komentar harus diisi (minimal 10 karakter)', 'error');
            resetSubmitButton(submitButton, originalHTML);
            return;
        }

        try {
            const result = await sheetsIntegration.submitComment(commentData);
            
            if (result.success) {
                // Reset form
                this.reset();
                resetRatingStars();
                
                showMessage(result.message, 'success');
                console.log('✅ Komentar berhasil dikirim');
                
                // Reload comments setelah 2 detik
                setTimeout(() => {
                    console.log('🔄 Memuat ulang komentar...');
                    loadAndDisplayComments();
                }, 2000);
                
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('❌ Error:', error);
            showMessage(error.message, 'error');
        } finally {
            resetSubmitButton(submitButton, originalHTML);
        }
    });
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to comments section
    const commentsSection = document.querySelector('.comments-section');
    if (commentsSection) {
        commentsSection.insertBefore(messageDiv, commentsSection.firstChild);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function resetSubmitButton(button, originalHTML) {
    button.innerHTML = originalHTML;
    button.disabled = false;
}

function initRatingStars() {
    const ratingStars = document.querySelectorAll('.rating-star');
    const ratingInput = document.querySelector('input[name="rating"]');
    
    if (!ratingStars.length || !ratingInput) {
        console.log('⭐ Rating stars tidak ditemukan');
        return;
    }
    
    console.log('⭐ Menginisialisasi rating stars');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            console.log(`⭐ Rating ${rating} bintang dipilih`);
            updateRatingStars(ratingStars, rating, ratingInput);
        });
        
        // Hover effect
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.style.transform = 'scale(1.1)';
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            ratingStars.forEach(s => {
                s.style.transform = '';
            });
        });
    });
    
    // Set default rating
    updateRatingStars(ratingStars, 5, ratingInput);
}

function updateRatingStars(stars, rating, input) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.style.color = '#ffc107';
        } else {
            star.classList.remove('active');
            star.style.color = '#ddd';
        }
    });
    input.value = '⭐'.repeat(rating);
}

function resetRatingStars() {
    const ratingStars = document.querySelectorAll('.rating-star');
    const ratingInput = document.querySelector('input[name="rating"]');
    
    if (ratingStars.length && ratingInput) {
        updateRatingStars(ratingStars, 5, ratingInput);
    }
}