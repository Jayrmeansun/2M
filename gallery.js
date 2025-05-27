document.addEventListener('DOMContentLoaded', () => {
    // Initialize memories
    const defaultMemories = [
        {
            title: "1 เดือน",
            date: "28 เมษายน 2568",
            desc: "เป็น 1 เดือนที่มีความสุขที่สุดเลย",
            image: "assets/images/3.jpg"
        },
        {
            title: "2 เดือน",
            date: "28 พฤษภาคม 2568",
            desc: "ขอบคุณที่อยู่ด้วยกันมาสองเดือนแล้วนะค้าบ",
            image: "assets/images/4.jpg"
        }
        // เพิ่มรูปภาพและรายละเอียดใหม่ที่นี่
    ];

    // Set default memories if not already set
    if (!localStorage.getItem('memories')) {
        localStorage.setItem('memories', JSON.stringify(defaultMemories));
    }

    // Render gallery
    renderGallery();

    // Card animation
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
});

// Render Gallery
function renderGallery() {
    try {
        const memories = JSON.parse(localStorage.getItem('memories') || '[]');
        const container = document.getElementById('gallery');
        if (!container) {
            console.error('Gallery container not found');
            return;
        }
        console.log('Memories:', memories); // Debug
        container.innerHTML = '';
        if (memories.length === 0) {
            container.innerHTML = '<p class="text-gray-600 text-center">ไม่มีรูปภาพในแกลลอรี</p>';
            return;
        }
        memories.forEach((memory, index) => {
            console.log(`Rendering memory ${index}:`, memory); // Debug
            const card = document.createElement('div');
            card.className = `card bg-${index % 2 === 0 ? 'pink' : 'purple'}-50 p-6 rounded-lg shadow-md`;
            const imageSrc = memory.image || 'assets/images/heart.png';
            card.innerHTML = `
                <img src="${imageSrc}" class="w-full h-48 object-cover rounded" alt="${memory.title || 'ภาพ'}" onerror="this.src='assets/images/heart.png'">
                <h3 class="text-xl font-bold mt-4">${memory.title || 'ไม่มีชื่อ'}</h3>
                <p class="text-gray-600">${memory.date || 'ไม่มีวันที่'} - ${memory.desc || 'ไม่มีรายละเอียด'}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error rendering gallery:', error);
        document.getElementById('gallery').innerHTML = '<p class="text-red-600 text-center">เกิดข้อผิดพลาดในการโหลดแกลลอรี</p>';
    }
}