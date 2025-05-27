document.addEventListener('DOMContentLoaded', () => {
    loadReplies();
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

function saveReply() {
    const reply = document.getElementById('reply-letter').value;
    if (reply) {
        const replies = JSON.parse(localStorage.getItem('replies') || '[]');
        replies.push({ text: reply, date: new Date().toLocaleString('th-TH') });
        localStorage.setItem('replies', JSON.stringify(replies));
        document.getElementById('reply-letter').value = '';
        loadReplies();
    }
}

function deleteReply(index) {
    if (confirm('แน่ใจว่าต้องการลบจดหมายนี้?')) {
        const replies = JSON.parse(localStorage.getItem('replies') || '[]');
        replies.splice(index, 1);
        localStorage.setItem('replies', JSON.stringify(replies));
        loadReplies();
    }
}

function loadReplies() {
    const replies = JSON.parse(localStorage.getItem('replies') || '[]');
    const container = document.getElementById('replies-container');
    container.innerHTML = '';
    replies.forEach((reply, index) => {
        const card = document.createElement('div');
        card.className = 'card bg-blue-50 p-6 rounded-lg shadow-md relative';
        card.innerHTML = `
            <p class="text-gray-600">${reply.text}</p>
            <p class="text-sm text-gray-500 mt-2">เขียนเมื่อ: ${reply.date}</p>
            <button onclick="deleteReply(${index})" class="mt-2 bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600">ลบ</button>
            <img src="assets/images/sparkle.png" class="sparkle top-2 left-2" alt="Sparkle">
        `;
        container.appendChild(card);
    });
}document.addEventListener('DOMContentLoaded', () => {
    loadReplies();
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

function saveReply() {
    const reply = document.getElementById('reply-letter').value;
    if (reply) {
        const replies = JSON.parse(localStorage.getItem('replies') || '[]');
        replies.push({ text: reply, date: new Date().toLocaleString('th-TH') });
        localStorage.setItem('replies', JSON.stringify(replies));
        document.getElementById('reply-letter').value = '';
        loadReplies();
    }
}

function deleteReply(index) {
    if (confirm('แน่ใจว่าต้องการลบจดหมายนี้?')) {
        const replies = JSON.parse(localStorage.getItem('replies') || '[]');
        replies.splice(index, 1);
        localStorage.setItem('replies', JSON.stringify(replies));
        loadReplies();
    }
}

function loadReplies() {
    const replies = JSON.parse(localStorage.getItem('replies') || '[]');
    const container = document.getElementById('replies-container');
    container.innerHTML = '';
    replies.forEach((reply, index) => {
        const card = document.createElement('div');
        card.className = 'card bg-blue-50 p-6 rounded-lg shadow-md relative';
        card.innerHTML = `
            <p class="text-gray-600">${reply.text}</p>
            <p class="text-sm text-gray-500 mt-2">เขียนเมื่อ: ${reply.date}</p>
            <button onclick="deleteReply(${index})" class="mt-2 bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600">ลบ</button>
            <img src="assets/images/sparkle.png" class="sparkle top-2 left-2" alt="Sparkle">
        `;
        container.appendChild(card);
    });
}