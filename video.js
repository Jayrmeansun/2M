function selectVideo(index) {
    const videos = document.querySelectorAll('.video-item');
    videos.forEach((video, i) => {
        video.classList.toggle('active', i === index);
    });
}

// Floating hearts animation
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        const heart = document.createElement('img');
        heart.src = 'assets/images/heart.png';
        heart.className = 'floating-heart w-12 absolute';
        heart.style.left = Math.random() * (window.innerWidth - 48) + 'px';
        heart.style.top = window.innerHeight + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }, 1000);
});