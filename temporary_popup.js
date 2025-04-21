const tempClose = document.getElementById('close-temp');
const tempPopup = document.getElementById('temp-popup');

tempClose.addEventListener('click', () => {
    tempPopup.classList.remove('show-in');
    tempPopup.classList.add('show-out');
});


let temp = setTimeout(() => {
    let isClosed = localStorage.getItem('is_closed');

    if (!isClosed) {
        tempPopup.classList.remove('show-out');
        tempPopup.classList.remove('show-in');
        localStorage.setItem('is_closed', 'true');
    }

}, 30_000);