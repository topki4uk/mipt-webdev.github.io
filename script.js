const button = document.getElementById('send-button');

button.addEventListener('mouseenter', () => {
    button.className = 'button-increase';
});

button.addEventListener('mouseleave', () => {
    button.className = 'button-decrease';
});