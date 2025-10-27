// Language System
const languageToggle = document.getElementById('languageToggle');
const langButtons = document.querySelectorAll('.lang-btn');
let currentLanguage = localStorage.getItem('language') || 'id';

// Translation data
const translations = {
    id: {
        // Cover
        'cover.title': 'Musix Record',
        'cover.subtitle': 'Jasa Aransemen, Mixing & Mastering Musik Profesional',
        'cover.button': 'Lihat Harga',
        
        // Header
        'header.title': 'Musix Record',
        'header.about': 'Tentang',
        'header.pricing': 'Harga',
        'header.contact': 'Kontak',
        
        // Menu
        'menu.about': 'Tentang Kami',
        'menu.pricing': 'Daftar Harga',
        'menu.process': 'Cara Pemesanan',
        'menu.documentation': 'Dokumentasi',
        'menu.instagram': 'Instagram',
        'menu.achievements': 'Prestasi',
        'menu.contact': 'Kontak',
        'menu.comments': 'Komentar',
        'menu.download': 'Download Brosur',
        
        // About Section
        'about.title': 'Tentang Musix Record',
        'about.text1': 'Musix Record adalah studio musik profesional yang berfokus pada jasa aransemen, mixing, dan mastering. Dengan pengalaman lebih dari 5 tahun di industri musik, kami telah membantu ratusan musisi dan artis mewujudkan karya musik mereka dengan kualitas terbaik.',
        'about.text2': 'Tim kami terdiri dari sound engineer dan musisi berpengalaman yang memahami kebutuhan artistik dan teknis dalam produksi musik. Kami menggunakan peralatan dan software terbaru untuk memastikan hasil yang maksimal.',
        'about.text3': 'Visi kami adalah menjadi partner terpercaya bagi musisi Indonesia dalam menciptakan karya musik berkualitas dunia.',
        'about.text4': 'Musix Record yang berasal di Komplek Puri Tirta Kencana Jalan Achmad Yani No. 730 Kota Bandung (sekarang di Kapten Jamhur No. 73A - Kota Banjar - Jawa Barat Indonesia). Menerima jasa pembuatan lagu / musik:',
        'about.text4List1': 'Ilustrasi,iklan, aransemen, minusone / karaoke, jingle, hymne, mars, dll.',
        'about.text4List2': 'Format audio dan score (partitur / not balok /  not angka) untuk berbagai instrumen musik vocal, duet, trio, kuartet, hingga orkestra.',
        'about.text5': 'Percayakan dengan pembuatan musik kami yang sudah berpengalaman studi di bidang pendidikan seni musik dan berpengalaman dalam pemesanan pembuatan musik dengan biaya terjangkau berkualitas baik.',
        'about.text6': 'Kami juga menerima jasa mixing dan mastering lagu / musik. dan juga menerima jasa kursus musik privat / home teaching (datang ke rumah sekitar Kota Banjar) untuk berbagai instrumen musik.',
        'about.text7': '*pembuatan musik sepenuhnya menggunakan AI (artificial intelligence) lebih mengutamakan Manusiawi (Humanize).',
        'about.text8': 'Menyewakan Sound System (dengan paket hemat), alat musik gitar elektrik, bass elektrik, drum elektrik, piano elektrik, dan lain-lain. ',

        // Pricing Section
        'pricing.title': 'Daftar Harga',
        'pricing.perSong': '/lagu',
        'pricing.button': 'Pesan Sekarang',
        'pricing.notation.title': 'Paket Notasi',
        'pricing.subtitle': 'mulai dari',
        'pricing.notation.feature1': 'Pembuatan Notasi:',
        'pricing.notation.feature2':'tulis/transkrip/lirik/angka/balok/midi/sequencer',
        'pricing.notation.feature3': '5 track',
        'pricing.notation.feature4': 'Revisi 4x',
        'pricing.notation.feature5': 'Waktu pengerjaan 7 hari',
        'pricing.notation.feature6': 'Konsultasi gratis',
        'pricing.note': '*harga tergantung tingkat kesulitan & permintaan aransemen',
        'pricing.student.title': 'Paket Pelajar Sekolah',
        'pricing.subtitle': 'mulai dari',
        'pricing.student.feature1': 'Aransemen mudah',
        'pricing.student.feature2': '5 track',
        'pricing.student.feature3': 'Revisi 2x',
        'pricing.student.feature4': 'Waktu pengerjaan 7 hari',
        'pricing.note': '*harga tergantung tingkat kesulitan & permintaan aransemen',
        'pricing.basic.title': 'Paket Basic',
        'pricing.subtitle': 'mulai dari',
        'pricing.basic.feature1': 'Aransemen sederhana',
        'pricing.basic.feature2': 'Aransemen & Mixing 8 track',
        'pricing.basic.feature3': 'Revisi 4x',
        'pricing.basic.feature4': 'Waktu pengerjaan 7 hari',
        'pricing.note': '*harga tergantung tingkat kesulitan & permintaan aransemen',
        'pricing.standard.title': 'Paket Standard',
        'pricing.subtitle': 'mulai dari',
        'pricing.standard.feature1': 'Aransemen menengah',
        'pricing.standard.feature2': 'Mixing 16 track',
        'pricing.standard.feature3': 'Mastering dasar',
        'pricing.standard.feature4': 'Revisi 3x',
        'pricing.standard.feature5': 'Waktu pengerjaan 7 hari',
        'pricing.note': '*harga tergantung tingkat kesulitan & permintaan aransemen',
        'pricing.premium.title': 'Paket Premium',
        'pricing.subtitle': 'mulai dari',
        'pricing.premium.feature1': 'Aransemen lengkap',
        'pricing.premium.feature2': 'Mixing unlimited track',
        'pricing.premium.feature3': 'Mastering profesional',
        'pricing.premium.feature4': 'Revisi 5x',
        'pricing.premium.feature5': 'Waktu pengerjaan 5 hari',
        'pricing.premium.feature6': 'Konsultasi gratis',
        'pricing.note': '*harga tergantung tingkat kesulitan & permintaan aransemen',
        'pricing.release.title': 'Paket Release',
        'pricing.release.feature1': 'Beberapa-seluruh Platform Musik',
        'pricing.release.feature2': 'Distribusikan musik secara digital ke tingkat Internasional',
        'pricing.release.feature3': 'Mendapatkan hak cipta dan copyright',
        'pricing.release.feature4': 'Tanpa biaya tahunan',
        'pricing.release.feature5': 'Waktu pengerjaan 1-2 Minggu',
        'pricing.release.feature6': 'Konsultasi gratis',
        'pricing.release.note': '*syarat, ketentuan, & harga tergantung pihak ke-3',
        'pricing.soundsystem.title': 'Paket Hemat Sewa Sound System',
        'pricing.soundsystem.feature1': 'Band, Hibuaran, Karaoke, Acara Sekolah & Kampus',
        'pricing.soundsystem.feature2': '🔊 Main front Speaker 🔊 Speaker high 8" & tweeter (2 unit) 🔊 Speaker Middle 12"+15” (2 unit) 🔊 Speaker SubWoofer 15" (1 unit) 🎚️ Mixing console (12ch) 🎤 Wireless Microphone (2-4 unit) 🎧 Include Sound Man 🔌 Unit Power (6000 Watt) (Hubungi)',
        'pricing.soundsystem.feature3': '/1x event',
        'pricing.soundsystem.feature4': 'Paket hemat',
        'pricing.soundsystem.feature5': 'Area cakupan Banjar & sekitarnya',
        'pricing.soundsystem.feature6': 'Konsultasi gratis',
        'pricing.soundsystem.note': '*syarat, ketentuan, & harga tergantung permintaan Equipment',
        'pricing.videoclip.title': 'Paket Video Clip',
        'pricing.videoclip.feature1': 'Rekam video, edit video',
        'pricing.videoclip.feature2': 'Video klip Musik, iklan, mars, hymne, pre wedding, hingga undangan',
        'pricing.videoclip.feature3': '/1x lagu',
        'pricing.videoclip.feature4': 'Paket hemat',
        'pricing.videoclip.feature5': 'Area cakupan Banjar & sekitarnya',
        'pricing.videoclip.feature6': 'Konsultasi gratis',
        'pricing.videoclip.note': '*syarat, ketentuan, & harga tergantung permintaan Equipment',
        'pricing.videoanime.title': 'Paket Video Animasi',
        'pricing.videoanime.feature1': 'Lyric video, animasi Video 2D, 3D sederhana',
        'pricing.videoanime.feature2': 'Video klip Musik, iklan, mars, hymne, pre wedding, hingga undangan',
        'pricing.videoanime.feature3': '/1x lagu',
        'pricing.videoanime.feature4': 'Revisi 5x',
        'pricing.videoanime.feature5': 'Waktu pengerjaan 1-2 Minggu',
        'pricing.videoanime.feature6': 'Konsultasi gratis',
        'pricing.videoanime.note': '*syarat, ketentuan, & harga tergantung permintaan Equipment',
        

        // Process Section
        'process.title': 'Teknis Pemesanan',
        'process.step1.title': 'Konsultasi',
        'process.step1.description': 'Diskusikan kebutuhan dan konsep musik Anda dengan tim kami',
        'process.step2.title': 'Pembayaran',
        'process.step2.description': 'Lakukan pembayaran DP 50% untuk memulai pengerjaan',
        'process.step3.title': 'Pengerjaan',
        'process.step3.description': 'Tim kami akan mengerjakan aransemen sesuai kesepakatan',
        'process.step4.title': 'Revisi',
        'process.step4.description': 'Berikan masukan untuk revisi sesuai paket yang dipilih',
        'process.step5.title': 'Finalisasi',
        'process.step5.description': 'Lunasi pembayaran dan terima hasil akhir karya musik Anda',
        
        // Documentation Section
        'documentation.title': 'Dokumentasi',
        'documentation.item1': 'Music Production',
        'documentation.item2': 'Mixing Session',
        'documentation.item3': 'Mastering Process',
        'documentation.item4': 'Live Performance',
        'documentation.item5': 'Client Session',
        'documentation.item6': 'Equipment',
        
        // Instagram Section
        'instagram.title': 'Instagram',
        
        // Achievements Section
        'achievements.title': 'Prestasi',
        'achievements.item1.title': '100+ Project',
        'achievements.item1.description': 'Lebih dari 100 project musik telah diselesaikan',
        'achievements.item2.title': '50+ Klien',
        'achievements.item2.description': 'Dipercaya oleh lebih dari 50 musisi dan artis',
        'achievements.item3.title': 'Rating 4.5/5',
        'achievements.item3.description': 'Kepuasan klien dengan rating hampir sempurna',
        'achievements.item4.title': '+10 Penghargaan',
        'achievements.item4.description': 'Penghargaan di bidang produksi musik',
        
        // Contact Section
        'contact.title': 'Kontak Kami',
        'contact.whatsapp': 'WhatsApp',
        'contact.email': 'Email',
        'contact.location': 'Lokasi',
        'contact.address': 'Kota Banjar No.73A, Jawa Barat, Indonesia',
        'contact.hours': 'Jam Operasional',
        'contact.hoursDetail': 'Senin - Sabtu: 09:00 - 18:00',
        'contact.whatsappButton': 'Hubungi via WhatsApp',
        
        // Comments Section
        'comments.title': 'Komentar Klien',
        'comments.login': 'Login dengan Google untuk berkomentar',
        'comments.commentLabel': 'Komentar',
        'comments.placeholder': 'Bagikan pengalaman Anda...',
        'comments.submit': 'Kirim Komentar',
        'comments.comment1': 'Hasil aransemennya keren banget! Tim Musix Record sangat profesional dan mengerti kebutuhan saya. Recommended!',
        'comments.comment2': 'Mixing dan mastering lagu saya jadi lebih hidup dan berkarakter. Proses revisi juga cepat dan memuaskan.',
        
        // Download Section
        'download.title': 'Download Brosur',
        'download.description': 'Download brosur lengkap kami untuk informasi lebih detail tentang layanan dan harga',
        'download.button': 'Download Brosur',
        
        // Footer
        'footer.title': 'Musix Record',
        'footer.description': 'Studio musik profesional dengan spesialisasi jasa aransemen, mixing, dan mastering untuk berbagai genre musik.',
        'footer.quickLinks': 'Tautan Cepat',
        'footer.link1': 'Tentang Kami',
        'footer.link2': 'Daftar Harga',
        'footer.link3': 'Cara Pemesanan',
        'footer.link4': 'Dokumentasi',
        'footer.link5': 'Kontak',
        'footer.services': 'Layanan',
        'footer.service1': 'Aransemen Musik',
        'footer.service2': 'Mixing Audio',
        'footer.service3': 'Mastering',
        'footer.service4': 'Recording',
        'footer.service5': 'Konsultasi Musik',
        'footer.contact': 'Kontak',
        'footer.address': 'Kota Banjar No.73A, Jawa Barat, Indonesia',
        'footer.hours': 'Senin - Sabtu: 09:00 - 18:00',
        'footer.rights': 'All rights reserved.',
        
        // Sidebar
        'sidebar.title': 'Musix Record',
        'sidebar.about': 'Tentang Musix Record',
        'sidebar.aboutText': 'Studio musik profesional dengan spesialisasi jasa aransemen, mixing, dan mastering untuk berbagai genre musik.',
        'sidebar.popular': 'Popular Posts',
        'sidebar.post1.title': 'Tips Memilih Studio Recording Terbaik',
        'sidebar.post1.date': '15 Maret 2023',
        'sidebar.post2.title': 'Perbedaan Mixing dan Mastering',
        'sidebar.post2.date': '10 Februari 2023',
        'sidebar.post3.title': '5 Software Produksi Musik Terbaik 2023',
        'sidebar.post3.date': '5 Januari 2023',
        'sidebar.tags': 'Labels Cloud',
        'sidebar.tag1': 'Aransemen',
        'sidebar.tag2': 'Mixing',
        'sidebar.tag3': 'Mastering',
        'sidebar.tag4': 'Studio',
        'sidebar.tag5': 'Recording',
        'sidebar.tag6': 'Audio',
        'sidebar.tag7': 'Produksi',
        'sidebar.tag8': 'Musik',
        'sidebar.categories': 'Kategori Layanan',
        'sidebar.category1.name': 'Aransemen Musik',
        'sidebar.category2.name': 'Mixing',
        'sidebar.category3.name': 'Mastering',
        'sidebar.category4.name': 'Recording',
        'sidebar.category5.name': 'Konsultasi',
        'sidebar.youMayLike': 'You May Like',
        'sidebar.link1': 'Studio Recording Jakarta',
        'sidebar.link2': 'Jasa Aransemen Lagu Pop',
        'sidebar.link3': 'Mixing dan Mastering Online',
        'sidebar.link4': 'Kursus Produksi Musik',
        
        // Theme
        'theme.dark': 'Mode Gelap'
    },
    en: {
        // Cover
        'cover.title': 'Musix Record',
        'cover.subtitle': 'Professional Music Arrangement, Mixing & Mastering Services',
        'cover.button': 'View Pricing',
        
        // Header
        'header.title': 'Musix Record',
        'header.about': 'About',
        'header.pricing': 'Pricing',
        'header.contact': 'Contact',
        
        // Menu
        'menu.about': 'About Us',
        'menu.pricing': 'Pricing',
        'menu.process': 'Order Process',
        'menu.documentation': 'Documentation',
        'menu.instagram': 'Instagram',
        'menu.achievements': 'Achievements',
        'menu.contact': 'Contact',
        'menu.comments': 'Comments',
        'menu.download': 'Download Brochure',
        
        'about.title': 'About Musix Record',
        'about.text1': 'Musix Record is a professional music studio that focuses on arrangement, mixing, and mastering services. With experience since 2008, more than 17 years in the music industry, we have helped dozens of musicians and artists realize their musical works with the highest quality.',
        'about.text2': 'Our team consists of experienced sound engineers and musicians who understand the artistic and technical needs in music production. We use the latest equipment and software to ensure optimal results.',
        'about.text3': 'Our vision is to become a trusted partner for Indonesian & International musicians in creating world-class quality music works.',
        'about.text4': 'Musix Record based in Komplek Puri Tirta Kencana Jalan Achmad Yani No. 730 Kota Bandung (now at Kapten Jamhur No. 73A - Kota Banjar - West Java Indonesia). Accepts song/music creation services:',
        'about.text4List1': 'Illustrations, advertisements, arrangements, minus one / karaoke, jingles, hymns, marches, etc.',
        'about.text4List2': 'Audio and score formats (sheet music / staff notation / numbered notation) for various musical instruments vocals, duets, trios, quartets, to orchestras.',
        'about.text5': 'Trust us with music creation by our experienced studio in the field of music arts education and experienced in ordering music creation with affordable quality costs.',
        'about.text6': 'We also offer song/music mixing and mastering services. We also offer private music lessons/home teaching (traveling to homes around the city of Banjar) for various musical instruments.',
        'about.text7': '*music creation is not entirely using AI (artificial intelligence) more prioritizing Humanize.',
        'about.text8': 'Renting Sound System (with economical packages), electric guitar musical instruments, electric bass, electric drums, electric piano, and others. ',

        // Pricing Section
        'pricing.title': 'Pricing List',
        'pricing.perSong': '/song',
        'pricing.button': 'Order Now',
        'pricing.notation.title': 'Notation Package',
        'pricing.subtitle': 'starting from',
        'pricing.notation.feature1': 'Notation Creation:',
        'pricing.notation.feature2': 'write/transcribe/lyrics/numbers/musical notation/midi/sequencer',
        'pricing.notation.feature3': '5 tracks',
        'pricing.notation.feature4': '4 revisions',
        'pricing.notation.feature5': '7 days completion time',
        'pricing.notation.feature6': 'Free consultation',
        'pricing.note': '*prices depend on the level of difficulty and demand for arrangements',
        'pricing.student.title': 'School Student Package',
        'pricing.subtitle': 'starting from',
        'pricing.notation.feature1': 'Notation Creation:',
        'pricing.student.feature1': 'Simple arrangement',
        'pricing.student.feature2': 'Mixing 8 tracks',
        'pricing.student.feature3': '2 revisions',
        'pricing.student.feature4': '7 days completion time',
        'pricing.note': '*prices depend on the level of difficulty and demand for arrangements',
        'pricing.basic.title': 'Basic Package',
        'pricing.subtitle': 'starting from',
        'pricing.notation.feature1': 'Notation Creation:',
        'pricing.basic.feature1': 'Simple arrangement',
        'pricing.basic.feature2': 'Arrangement & Mixing 8 tracks',
        'pricing.basic.feature3': '4 revisions',
        'pricing.basic.feature4': '7 days completion time',
        'pricing.note': '*prices depend on the level of difficulty and demand for arrangements',
        'pricing.standard.title': 'Standard Package',
        'pricing.standard.feature1': 'Intermediate arrangement',
        'pricing.standard.feature2': 'Mixing 16 tracks',
        'pricing.standard.feature3': 'Basic mastering',
        'pricing.standard.feature4': '3 revisions',
        'pricing.standard.feature5': '7 days completion time',
        'pricing.note': '*prices depend on the level of difficulty and demand for arrangements',
        'pricing.premium.title': 'Premium Package',
        'pricing.subtitle': 'starting from',
        'pricing.notation.feature1': 'Notation Creation:',
        'pricing.premium.feature1': 'Complete arrangement',
        'pricing.premium.feature2': 'Unlimited track mixing',
        'pricing.premium.feature3': 'Professional mastering',
        'pricing.premium.feature4': '5 revisions',
        'pricing.premium.feature5': '5 days completion time',
        'pricing.premium.feature6': 'Free consultation',
        'pricing.note': '*prices depend on the level of difficulty and demand for arrangements',
        'pricing.release.title': 'Release Package',
        'pricing.subtitle': 'starting from',
        'pricing.notation.feature1': 'Notation Creation:',
        'pricing.release.feature1': 'Complete arrangement',
        'pricing.release.feature2': 'Unlimited track mixing',
        'pricing.release.feature3': 'Professional mastering',
        'pricing.release.feature4': '5 revisions',
        'pricing.release.feature5': 'Completion time: 1-2 weeks',
        'pricing.release.feature6': 'Free consultation',
        'pricing.release.note': '*prices depend on the level of difficulty and demand for arrangements',
        'pricing.soundsystem.title': 'Release Package',
        'pricing.subtitle': 'starting from',
        'pricing.notation.feature1': 'Notation Creation:',
        'pricing.soundsystem.feature1': 'Economical Sound System Rental Package',
        'pricing.soundsystem.feature2': 'Band, Parties, Karaoke, School & Campus Event',
        'pricing.soundsystem.feature3': '/1x event',
        'pricing.soundsystem.feature4': 'Economical package',
        'pricing.soundsystem.feature5': 'Coverage area of Banjar & surroundings',
        'pricing.soundsystem.feature6': 'Free consultation',
        'pricing.soundsystem.note': '*terms, conditions, & prices depend on Equipment requests',
        'pricing.videoclip.title': 'Video Clip Package',
        'pricing.videoclip.feature1': 'Record videos, edit videos',
        'pricing.videoclip.feature2': 'Music videos, commercials, marches, hymns, pre-wedding videos, invitations',
        'pricing.videoclip.feature3': '/1x event',
        'pricing.videoclip.feature4': 'Economical package',
        'pricing.videoclip.feature5': 'Coverage area of Banjar & surroundings',
        'pricing.videoclip.feature6': 'Free consultation',
        'pricing.videoclip.note': '*terms, conditions, & prices depend on Equipment requests',
        'pricing.videoanime.title': 'Animated Video Package',
        'pricing.videoanime.feature1': 'Lyric videos, simple 2D and 3D animated videos',
        'pricing.videoanime.feature2': 'Music videos, commercials, marches, hymns, pre-wedding videos, invitations',
        'pricing.videoanime.feature3': '/1x Song',
        'pricing.videoanime.feature4': '5 revisions',
        'pricing.videoanime.feature5': 'Completion time: 1-2 weeks',
        'pricing.videoanime.feature6': 'Free consultation',
        'pricing.videoanime.note': '*terms, conditions, & prices depend on Equipment requests',

        // Process Section
        'process.title': 'Order Process',
        'process.step1.title': 'Consultation',
        'process.step1.description': 'Discuss your needs and music concept with our team',
        'process.step2.title': 'Payment',
        'process.step2.description': 'Make a 50% down payment to start the work',
        'process.step3.title': 'Production',
        'process.step3.description': 'Our team will work on the arrangement according to agreement',
        'process.step4.title': 'Revision',
        'process.step4.description': 'Provide feedback for revisions according to the chosen package',
        'process.step5.title': 'Finalization',
        'process.step5.description': 'Complete payment and receive your final music work',
        
        // Documentation Section
        'documentation.title': 'Documentation',
        'documentation.item1': 'Music Production',
        'documentation.item2': 'Mixing Session',
        'documentation.item3': 'Mastering Process',
        'documentation.item4': 'Live Performance',
        'documentation.item5': 'Client Session',
        'documentation.item6': 'Equipment',
        
        // Instagram Section
        'instagram.title': 'Instagram',
        
        // Achievements Section
        'achievements.title': 'Achievements',
        'achievements.item1.title': '100+ Projects',
        'achievements.item1.description': 'Over 100 music projects completed',
        'achievements.item2.title': '50+ Clients',
        'achievements.item2.description': 'Trusted by more than 50 musicians and artists',
        'achievements.item3.title': '4.5/5 Rating',
        'achievements.item3.description': 'Client satisfaction with near-perfect rating',
        'achievements.item4.title': '+10 Awards',
        'achievements.item4.description': 'Awards in music production field',
        
        // Contact Section
        'contact.title': 'Contact Us',
        'contact.whatsapp': 'WhatsApp',
        'contact.email': 'Email',
        'contact.location': 'Location',
        'contact.address': 'Banjar City No.73A, West Java, Indonesia',
        'contact.hours': 'Business Hours',
        'contact.hoursDetail': 'Monday - Saturday: 09:00 - 18:00',
        'contact.whatsappButton': 'Contact via WhatsApp',
        
        // Comments Section
        'comments.title': 'Client Comments',
        'comments.login': 'Login with Google to comment',
        'comments.commentLabel': 'Add Comment',
        'comments.placeholder': 'Share your experience...',
        'comments.submit': 'Submit Comment',
        'comments.comment1': 'The arrangement results are amazing! Musix Record team is very professional and understands my needs. Recommended!',
        'comments.comment2': 'Mixing and mastering made my song more alive and characterful. The revision process is also fast and satisfying.',
        
        // Download Section
        'download.title': 'Download Brochure',
        'download.description': 'Download our complete brochure for more detailed information about services and pricing',
        'download.button': 'Download Brochure',
        
        // Footer
        'footer.title': 'Musix Record',
        'footer.description': 'Professional music studio specializing in arrangement, mixing, and mastering services for various music genres.',
        'footer.quickLinks': 'Quick Links',
        'footer.link1': 'About Us',
        'footer.link2': 'Pricing',
        'footer.link3': 'Order Process',
        'footer.link4': 'Documentation',
        'footer.link5': 'Contact',
        'footer.services': 'Services',
        'footer.service1': 'Music Arrangement',
        'footer.service2': 'Audio Mixing',
        'footer.service3': 'Mastering',
        'footer.service4': 'Recording',
        'footer.service5': 'Music Consultation',
        'footer.contact': 'Contact',
        'footer.address': 'Banjar City No.73A, West Java, Indonesia',
        'footer.hours': 'Monday - Saturday: 09:00 - 18:00',
        'footer.rights': 'All rights reserved.',
        
        // Sidebar
        'sidebar.title': 'Musix Record',
        'sidebar.about': 'About Musix Record',
        'sidebar.aboutText': 'Professional music studio specializing in arrangement, mixing, and mastering services for various music genres.',
        'sidebar.popular': 'Popular Posts',
        'sidebar.post1.title': 'Tips for Choosing the Best Recording Studio',
        'sidebar.post1.date': 'March 15, 2023',
        'sidebar.post2.title': 'Difference Between Mixing and Mastering',
        'sidebar.post2.date': 'February 10, 2023',
        'sidebar.post3.title': '5 Best Music Production Software 2023',
        'sidebar.post3.date': 'January 5, 2023',
        'sidebar.tags': 'Labels Cloud',
        'sidebar.tag1': 'Arrangement',
        'sidebar.tag2': 'Mixing',
        'sidebar.tag3': 'Mastering',
        'sidebar.tag4': 'Studio',
        'sidebar.tag5': 'Recording',
        'sidebar.tag6': 'Audio',
        'sidebar.tag7': 'Production',
        'sidebar.tag8': 'Music',
        'sidebar.categories': 'Service Categories',
        'sidebar.category1.name': 'Music Arrangement',
        'sidebar.category2.name': 'Mixing',
        'sidebar.category3.name': 'Mastering',
        'sidebar.category4.name': 'Recording',
        'sidebar.category5.name': 'Consultation',
        'sidebar.youMayLike': 'You May Like',
        'sidebar.link1': 'Recording Studio Jakarta',
        'sidebar.link2': 'Pop Song Arrangement Service',
        'sidebar.link3': 'Online Mixing and Mastering',
        'sidebar.link4': 'Music Production Course',
        
        // Theme
        'theme.dark': 'Dark Mode'
    }
};

// Function to update language
function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update active button
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update time display format based on language
    updateTime();
}

// Language toggle event listeners
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        updateLanguage(lang);
    });
});

// Update time display function to support multiple languages
function updateTime() {
    const now = new Date();
    let options;
    
    if (currentLanguage === 'id') {
        options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
    } else {
        options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
    }
    
    const timeString = now.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : 'en-US', options);
    document.getElementById('timeDisplay').textContent = timeString;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLanguage(currentLanguage);
    
    // Rest of your existing DOMContentLoaded code...
    console.log('Musix Record website loaded successfully!');
    
    // Hide mobile navigation by default
    if (window.innerWidth <= 768) {
        document.querySelector('header nav').style.display = 'none';
    }
    
    // Initial check for theme toggle visibility
    setTimeout(() => {
        handleThemeToggleVisibility();
    }, 500);
});

        // Time Display
function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const timeString = now.toLocaleDateString('id-ID', options);
    document.getElementById('timeDisplay').textContent = timeString;
}

// Initialize time display
setInterval(updateTime, 1000);
updateTime();

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.querySelector('span');

// Variables for auto-hide functionality
let themeToggleTimeout;
const THEME_TOGGLE_HIDE_DELAY = 5000; // 5 seconds

// Function to show theme toggle
function showThemeToggle() {
    themeToggle.classList.add('active');
    
    // Clear existing timeout
    if (themeToggleTimeout) {
        clearTimeout(themeToggleTimeout);
    }
    
    // Set new timeout to hide after 5 seconds
    themeToggleTimeout = setTimeout(() => {
        hideThemeToggle();
    }, THEME_TOGGLE_HIDE_DELAY);
}

// Function to hide theme toggle
function hideThemeToggle() {
    themeToggle.classList.remove('active');
}

// Function to handle theme toggle visibility based on scroll position
function handleThemeToggleVisibility() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show theme toggle when scrolled 100px from top
    // Always show when not at the very top or very bottom
    const isAtTop = scrollPosition < 100;
    const isAtBottom = scrollPosition > (documentHeight - windowHeight - 50);
    
    if (!isAtTop && !isAtBottom) {
        showThemeToggle();
    } else {
        hideThemeToggle();
    }
}

// Scroll event listener for both back to top and theme toggle
let scrollTimeout;
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    // Back to top button
    if (scrollPosition > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
    
    // Debounce scroll events for better performance
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        handleThemeToggleVisibility();
    }, 100);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize theme toggle visibility
handleThemeToggleVisibility();

// Check for saved theme preference or respect OS preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    themeIcon.className = 'fas fa-sun';
    themeText.textContent = 'Mode Cerah';
} else {
    document.body.classList.remove('dark-theme');
    themeIcon.className = 'fas fa-moon';
    themeText.textContent = 'Mode Gelap';
}

// Theme toggle click handler with auto-hide reset
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Mode Cerah';
        theme = 'dark';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Mode Gelap';
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Reset auto-hide timer when theme toggle is clicked
    showThemeToggle();
});

// Mouse events for theme toggle - show on hover and reset timer
themeToggle.addEventListener('mouseenter', () => {
    showThemeToggle();
});

themeToggle.addEventListener('mouseleave', () => {
    // Start hide timer when mouse leaves
    if (themeToggleTimeout) {
        clearTimeout(themeToggleTimeout);
    }
    themeToggleTimeout = setTimeout(() => {
        hideThemeToggle();
    }, THEME_TOGGLE_HIDE_DELAY);
});

// Show theme toggle when user interacts with the page
document.addEventListener('mousemove', () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const isAtTop = scrollPosition < 100;
    const isAtBottom = scrollPosition > (documentHeight - windowHeight - 50);
    
    if (!isAtTop && !isAtBottom) {
        showThemeToggle();
    }
});

// Sidebar Functionality
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Open sidebar
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
});

// Close sidebar
sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close sidebar when clicking on overlay
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Dropdown Menu Functionality
const menuBtn = document.getElementById('menuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

// Toggle dropdown menu
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('active');
    }
});

// Close dropdown when clicking on a menu item
dropdownMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
        dropdownMenu.classList.remove('active');
        
        // Close sidebar jika terbuka
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Close dropdown with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
        dropdownMenu.classList.remove('active');
    }
});

// Social Media Toggle
const socialToggle = document.getElementById('socialToggle');
const socialIcons = document.getElementById('socialIcons');

socialToggle.addEventListener('click', () => {
    socialIcons.classList.toggle('active');
    
    if (socialIcons.classList.contains('active')) {
        socialToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        socialToggle.innerHTML = '<i class="fas fa-share-alt"></i>';
    }
});



// Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initRatingStars();
    // ... kode lainnya
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close semua menu yang terbuka
            dropdownMenu.classList.remove('active');
            
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Close mobile menu jika open
            if (window.innerWidth <= 768) {
                const headerNav = document.querySelector('header nav');
                headerNav.style.display = 'none';
            }
            
            // Show theme toggle after smooth scroll
            setTimeout(() => {
                handleThemeToggleVisibility();
            }, 1000);
        }
    });
});

// Gallery item click handler
document.querySelectorAll('.gallery-item, .instagram-post').forEach(item => {
    item.addEventListener('click', function() {
        alert('Ini adalah placeholder untuk konten ' + this.textContent + '. Konten aktual akan ditampilkan di sini.');
    });
});

// Pricing card click handler (for the order buttons)
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const packageName = this.closest('.pricing-card').querySelector('h3').textContent;
        alert(`Anda memilih ${packageName}. Anda akan diarahkan ke halaman pemesanan.`);
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Musix Record website loaded successfully!');
    
    // Hide mobile navigation by default
    if (window.innerWidth <= 768) {
        document.querySelector('header nav').style.display = 'none';
    }
    
    // Initial check for theme toggle visibility
    setTimeout(() => {
        handleThemeToggleVisibility();
    }, 500);
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('header nav').style.display = 'flex';
        document.querySelector('header nav').style.position = 'static';
        document.querySelector('header nav').style.background = 'transparent';
        document.querySelector('header nav').style.backdropFilter = 'none';
        document.querySelector('header nav').style.padding = '0';
        document.querySelector('header nav').style.borderRadius = '0';
        document.querySelector('header nav').style.boxShadow = 'none';
        document.querySelector('header nav').style.flexDirection = 'row';
    } else {
        document.querySelector('header nav').style.display = 'none';
    }
    
    // Re-check theme toggle visibility after resize
    handleThemeToggleVisibility();
});

// Clean up timeout when page is unloaded
window.addEventListener('beforeunload', () => {
    if (themeToggleTimeout) {
        clearTimeout(themeToggleTimeout);
    }
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
});