const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const body = document.body;

const objects = [];

let lastX = 0;
let lastY = 0;
let deltaX = 0;
let deltaY = 0;

let lastScroll = 0;
let deltaScroll = 0;

const resistance = 0.01; 

function mouseMove(event) {
    deltaX = event.clientX - lastX;
    deltaY = event.clientY - lastY;
    
    lastX = event.clientX;
    lastY = event.clientY;
}

function scrollHandle() {
    if (Math.abs(window.scrollY - lastScroll) <= 100) {
        deltaScroll = window.scrollY - lastScroll;
    }
    lastScroll = window.scrollY;
}

function createObject() {
    const size = Math.random() * 4 + 10; // Случайный размер
    const x = Math.random() * canvas.width; // Случайная позиция по X
    const y = Math.random() * canvas.height; // Случайная позиция по Y
    const speedX = 0.5 * Math.random(); // Случайная скорость по X
    const speedY = 0.5 * Math.random(); // Случайная скорость по Y
    const deltaX = 0;
    const deltaY = 0;

    objects.push({ x, y, size, speedX, speedY, deltaX, deltaY });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка канваса

    objects.forEach(obj => {
        obj.deltaX = 0.01 * deltaX;
        obj.deltaY = 0.01 * deltaY;

        // Обновление позиции
        obj.x += obj.speedX + obj.deltaX;
        obj.y += obj.speedY + obj.deltaY + deltaScroll * 0.03;

        if (obj.x < 0) obj.x = canvas.width;
        if (obj.x > canvas.width) obj.x = 0;

        if (obj.y < 0) obj.y = canvas.height;
        if (obj.y > canvas.height) obj.y = 0;

        // Отрисовка объекта
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(180, 53%, 19%, 0.1)';
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(update); // Запрос следующего кадра
}

// Создаем несколько объектов
for (let i = 0; i < 50; i++) {
    createObject();
}

// Запускаем анимацию
update();

window.addEventListener('scroll', scrollHandle);
window.addEventListener('mousemove', mouseMove);