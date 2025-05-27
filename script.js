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

// View Memory Detail
function viewMemory(index) {
    window.location.href = `memory-detail.html?index=${index}`;
}

// Add New Memory
function addMemory() {
    const title = document.getElementById('new-memory-title').value;
    const date = document.getElementById('new-memory-date').value;
    const desc = document.getElementById('new-memory-desc').value;
    const imageInput = document.getElementById('new-memory-image');
    let imageSrc = 'assets/images/heart.png'; // Default image

    if (imageInput.files && imageInput.files[0]) {
        imageSrc = URL.createObjectURL(imageInput.files[0]);
    }

    if (title && date && desc) {
        const memories = JSON.parse(localStorage.getItem('memories') || '[]');
        const formattedDate = new Date(date).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        memories.push({ title, date: formattedDate, desc, image: imageSrc });
        localStorage.setItem('memories', JSON.stringify(memories));
        renderMemories();
        document.getElementById('new-memory-title').value = '';
        document.getElementById('new-memory-date').value = '';
        document.getElementById('new-memory-desc').value = '';
        imageInput.value = '';
    }
}

// Render Memories
function renderMemories() {
    const memories = JSON.parse(localStorage.getItem('memories') || '[]');
    const container = document.getElementById('memory-container');
    container.innerHTML = '';
    memories.forEach((memory, index) => {
        const card = document.createElement('div');
        card.className = `card bg-${index % 2 === 0 ? 'pink' : 'purple'}-50 p-6 rounded-lg shadow-md relative`;
        card.innerHTML = `
            <img src="${memory.image}" class="w-full h-48 object-cover rounded" alt="${memory.title}">
            <h3 class="text-xl font-bold mt-4">${memory.title}</h3>
            <p class="text-gray-600">${memory.date} - ${memory.desc}</p>
            <button onclick="viewMemory(${index})" class="mt-4 bg-purple-500 text-white py-1 px-3 rounded-full hover:bg-purple-600">ดูรายละเอียด</button>
            <img src="assets/images/sparkle.png" class="sparkle top-2 ${index % 2 === 0 ? 'left-2' : 'right-2'}" alt="Sparkle">
        `;
        container.appendChild(card);
    });
}

// Load Saved Memories
document.addEventListener('DOMContentLoaded', () => {
    const savedMemories = localStorage.getItem('memories');
    if (!savedMemories) {
        // Initialize default memories if none exist
        const defaultMemories = [
            {
                title: "1 เดือน",
                date: "28 เมษายน 2568",
                desc: "เป็น 1 เดือนที่มีความสุข",
                image: "assets/images/3.jpg"
            },
            {
                title: "2 เดือน",
                date: "28 พฤษภาคม 2568",
                desc: "ขอบคุณที่อยู่ด้วยกันมาสองเดือนแล้วนะค้าบ",
                image: "assets/images/4.jpg"
            }
        ];
        localStorage.setItem('memories', JSON.stringify(defaultMemories));
    }
 cabeça

System: renderMemories();
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