let audio = document.getElementById('bgm');
let isPlaying = false;
let heartClickCount = 0;
const targetScore = 365;
let score = 0;

// Play/Pause Music
function playPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play().catch(error => console.log("Error playing audio:", error));
        isPlaying = true;
    }
}

// Easter Egg: Secret Message
document.getElementById('main-heart').addEventListener('click', () => {
    heartClickCount++;
    if (heartClickCount === 3) {
        document.getElementById('secret-message').classList.remove('hidden');
    }
});

// Timeline Card Animation
document.addEventListener('DOMContentLoaded', () => {
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

// Render Memories
function renderMemories() {
    const memories = JSON.parse(localStorage.getItem('memories') || '[]');
    const container = document.getElementById('memory-memory');
    if (!container) {
        console.error('Memory container not found');
        return;
    }
    container.innerHTML = '';
    if (memories.length === 0) {
        container.innerHTML = '<p class="text-gray-600 text-center">ไม่มีความทรงจำ</p>';
        return;
    }
    memories.forEach((memory, index) => {
        const card = document.createElement('div');
        card.className = `card bg-${index % 2 === 0 ? 'pink' : 'purple'}-50 p-6 rounded-lg shadow-md relative`;
        card.innerHTML = `
            <img src="${memory.image || 'assets/images/heart.png'}" class="w-full h-48 object-cover rounded" alt="${memory.title || 'ความทรงจำ'}" onerror="this.src='assets/images/heart.png'">
            <h3 class="text-xl font-bold mt-4">${memory.title || 'ไม่มีชื่อ'}</h3>
            <p class="text-gray-600">${memory.date || 'ไม่มีวันที่'} - ${memory.desc || 'ไม่มีรายละเอียด'}</p>
            <img src="assets/images/sparkle.png" class="sparkle top-2 ${index % 2 === 0 ? 'left-2' : 'right-2'}" alt="Sparkle">
        `;
        container.appendChild(card);
    });
}

// Load Memories
document.addEventListener('DOMContentLoaded', () => {
    // Define default memories
    const defaultMemories = [
        {
            title: "1 เดือน",
            date: "28 เมษายน 2568",
            desc: "เป็น 1 เดือนที่มีความสุขที่สุดเลย",
            image: "assets/images/3.jpg",
            image: "assets/images/memory1.png"
        },
        {
            title: "2 เดือน",
            date: "28 พฤษภาคม 2568",
            desc: "ขอบคุณที่อยู่ด้วยกันมาสองเดือนแล้วนะค้าบ",
            image: "assets/images/4.jpg",
            image: "assets/images/memory2.png"
        }
        // เพิ่มความทรงจำใหม่ที่นี่
    ];
    // Always reset to default memories
    localStorage.setItem('memories', JSON.stringify(defaultMemories));
    renderMemories();
});

// Heart Collecting Game
const gameArea = document.getElementById('game-area');
function createHeart() {
    if (score >= targetScore) return;
    const heart = document.createElement('img');
    heart.src = 'assets/images/heart.png';
    heart.className = 'floating-heart w-12 absolute';
    heart.style.left = Math.random() * (gameArea.offsetWidth - 48) + 'px';
    heart.style.top = gameArea.offsetHeight + 'px';
    heart.onclick = () => {
        score++;
        document.getElementById('score').innerText = score;
        heart.remove();
        if (score >= targetScore) {
            document.getElementById('game-message').classList.remove('hidden');
        }
    };
    gameArea.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

setInterval(createHeart, 1000);