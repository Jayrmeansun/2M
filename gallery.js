document.addEventListener('DOMContentLoaded', () => {
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

    // Render gallery
    renderGallery();
});

// Render Gallery
function renderGallery() {
    const memories = JSON.parse(localStorage.getItem('memories') || '[]');
    const container = document.getElementById('gallery');
    if (!container) {
        console.error('Gallery container not found');
        return;
    }
    container.innerHTML = '';
    if (memories.length === 0) {
        container.innerHTML = '<p class="text-gray-600 text-center">ไม่มีรูปภาพในแกลลอรี</p>';
        return;
    }
    memories.forEach((memory, index) => {
        const card = document.createElement('div');
        card.className = `card bg-${index % 2 === 0 ? 'pink' : 'purple'}-50 p-6 rounded-lg shadow-md`;
        card.innerHTML = `
            <img src="${memory.image || 'assets/images/heart.png'}" class="w-full h-48 object-cover rounded" alt="${memory.title || 'ภาพ'}" onerror="this.src='assets/images/heart.png'">
            <h3 class="text-xl font-bold mt-4">${memory.title || 'ไม่มีชื่อ'}</h3>
            <p class="text-gray-600">${memory.date || 'ไม่มีวันที่'} - ${memory.desc || 'ไม่มีรายละเอียด'}</p>
        `;
        container.appendChild(card);
    });
}

// Initialize Memories
document.addEventListener('DOMContentLoaded', () => {
    // Define default memories
    const defaultMemories = [
        {
            title: "1 เดือน",
            date: "28 เมษายน 2568",
            desc: "เป็นการเริ่มต้นที่มีความสุขที่สุดเลยค้าบ",
            image: "assets/images/memory1.png",
            image: "assets/images/3.jpg"
        },
        {
            title: "2 เดือน",
            date: "28 พฤษภาคม 2568",
            desc: "อยู่ด้วยกันมาสองเดือนแล้วนะค้าบ",
            image: "assets/images/3_extra.jpg",
            image: "assets/images/memory2.png"
        }
        // เพิ่มรูปภาพและรายละเอียดใหม่ที่นี่
    ];
    // Set default memories if not already set
    if (!localStorage.getItem('memories')) {
        localStorage.setItem('memories', JSON.stringify(defaultMemories));
    }
    renderGallery();
});