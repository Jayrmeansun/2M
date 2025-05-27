document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    const memories = JSON.parse(localStorage.getItem('memories') || '[]');

    if (index !== null && memories[index]) {
        const memory = memories[index];
        document.getElementById('memory-image').src = memory.image;
        document.getElementById('memory-title').innerText = memory.title;
        document.getElementById('memory-desc').innerText = `${memory.date} - ${memory.desc}`;
    } else {
        document.getElementById('memory-detail').innerHTML = '<p class="text-gray-600">ไม่พบความทรงจำนี้</p>';
    }
});