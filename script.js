const backButton = document.getElementById('back-button');
const firstExam = new Date('May 27, 2025, 10:00:00').getTime();
const gallery = document.getElementById('gallery');

const currInd = 0;
const next = document.getElementById('next');
const prev = document.getElementById('prev');

function countRestTime() {
    const now = new Date().getTime();
    const delta = firstExam - now;

    if (delta <= 0) {
        document.getElementById('timer').innerHTML ='TIME IS OVER';
    }
    
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(delta % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutes = Math.floor(delta % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(delta % (1000 * 60) / 1000);

    document.getElementById('day').innerHTML = days + ' ' + (days != 1 ? 'days' : 'day');
    document.getElementById('hour').innerHTML = hours + ' ' + (hours != 1 ? 'hours' : 'hour');
    document.getElementById('minute').innerHTML = minutes + ' ' + (minutes != 1 ? 'minutes' : 'minute');
    document.getElementById('second').innerHTML = seconds + ' ' + (seconds != 1 ? 'seconds' : 'second');
}

function validateIndexes(index) {
    if (index == 1) {
        prev.style = 'display: none';
    } else if (index == gallery.querySelectorAll('img').length) {
        next.style = 'display: none';
    } else {
        prev.style = '';
        next.style = '';
    }
}

function showOnPopup(imgSrc, index) {
    const popup = document.getElementById('popup');
    const image = document.getElementById('popup-image');
    const main = document.getElementById('main');
    const header = document.getElementById('menu-block');

    main.className = 'blurred';
    header.className = 'blurred';
    popup.classList.remove('show-out');
    popup.classList.add('show-in');
    image.src = imgSrc;

    validateIndexes(index);
    window.currInd = index;
}

function closePopup(event) {
    const popup = document.getElementById('popup');
    const main = document.getElementById('main');
    const header = document.getElementById('menu-block');

    main.className = '';
    header.className = '';
    popup.classList.remove('show-in');
    popup.classList.add('show-out');
}

function nextImage(event) {
    window.currInd++;
    const image = document.getElementById('popup-image');
    const ind = window.currInd;
    image.src = `static/img${ind}.webp`;
    validateIndexes(ind);
    
}

function prevImage(event) {
    window.currInd--;
    const image = document.getElementById('popup-image');
    const ind = window.currInd;
    image.src = `static/img${ind}.webp`;
    validateIndexes(ind);
}

function fixHeader() {
    const header = document.getElementById('menu-block');
    const firstScreenSize = window.innerHeight;

    if (window.scrollY > firstScreenSize) {
        header.classList.add('fix');
    } else {
        header.classList.remove('fix');
    }
}

function showPopup(event) {
    console.log(event.target.tagName);
    if (event.target.tagName == 'IMG') {
        const ind = Number(event.target.id.slice(3));
        showOnPopup(event.target.getAttribute('src'), ind);
    }
}

window.addEventListener('scroll', fixHeader);

let x = setInterval(countRestTime, 1000);

next.addEventListener('click', nextImage);
prev.addEventListener('click', prevImage);

gallery.addEventListener('click', showPopup);
backButton.addEventListener('click', closePopup);