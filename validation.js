const latinPattern = /^[A-Za-z]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactMeButton = document.getElementById('contact-button');
const closeButton = document.getElementById('close-form-button');

const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

const sendForm = document.getElementById('contact-form');

const nameErrorMessage = document.getElementById('nameErrorMessage');
const surnameErrorMessage = document.getElementById('surnameErrorMessage');
const emailErrorMessage = document.getElementById('emailErrorMessage');
const usermessageErrorMessage = document.getElementById('usermessageErrorMessage');

function openContactFormPopup(event) {
    const contactForm = document.getElementById('contact-form-popup');
    const main = document.getElementById('main');
    const header = document.getElementById('menu-block');

    main.className = 'blurred';
    header.classList.add('blurred');
    contactForm.classList.remove('show-out');
    contactForm.classList.add('show-in');
}

function closeContactFormPopup(event) {
    const contactForm = document.getElementById('contact-form-popup');
    const main = document.getElementById('main');
    const header = document.getElementById('menu-block');

    main.className = '';
    header.classList.remove('blurred');
    contactForm.classList.remove('show-in');
    contactForm.classList.add('show-out');
}

function validNameInput(event) {
    if (nameInput.value == '') {
        nameInput.className = 'invalid';
        nameErrorMessage.style = 'display: block';
        nameErrorMessage.innerHTML = 'Field "name" should not be empty!';
        nameErrorMessage.className = 'show show-in';
    } else if (!latinPattern.test(nameInput.value)) {
        nameInput.className = 'invalid';
        nameErrorMessage.style = 'display: block';
        nameErrorMessage.innerHTML = 'Field "name" should contains only latin letter!';
        nameErrorMessage.className = 'show show-in';
    } else if (nameInput.value.length > 30) {
        nameInput.className = 'invalid';
        nameErrorMessage.style = 'display: block';
        nameErrorMessage.innerHTML = 'Field "name" should contains lesser then 30 letters!';
        nameErrorMessage.className = 'show show-in';
    } else {
        nameInput.className = 'valid';
        nameErrorMessage.style = '';
        nameErrorMessage.className = 'show show-out';
    }
    validForm();
}

function validSurnameInput(event) {
    if (surnameInput.value.trim() == '') {
        surnameInput.className = 'invalid';
        surnameErrorMessage.style = 'display: block';
        surnameErrorMessage.innerHTML = 'Field "surname" should not be empty!';
        surnameErrorMessage.className = 'show show-in';
    } else if (!latinPattern.test(surnameInput.value)) {
        surnameInput.className = 'invalid';
        surnameErrorMessage.style = 'display: block';
        surnameErrorMessage.innerHTML = 'Field "surname" should contains only latin letter!';
        surnameErrorMessage.className = 'show show-in';
    } else if (surnameInput.value.length > 30) {
        surnameInput.className = 'invalid';
        surnameErrorMessage.style = 'display: block';
        surnameErrorMessage.innerHTML = 'Field "surname" should contains lesser then 30 letters!';
        surnameErrorMessage.className = 'show show-in';
    } else {
        surnameInput.className = 'valid';
        surnameErrorMessage.style = '';
        surnameErrorMessage.className = 'show show-out';
    }
    validForm();
}

function validEmailInput(event) {
    if (emailInput.value.trim() == '') {
        emailInput.className = 'invalid';
        emailErrorMessage.style = 'display: block';
        emailErrorMessage.innerHTML = 'Field "email" should not be empty!';
        emailErrorMessage.className = 'show show-in';
    } else if (!emailPattern.test(emailInput.value)) {
        emailInput.className = 'invalid';
        emailErrorMessage.style = 'display: block';
        emailErrorMessage.innerHTML = 'Field "email" should be email address!';
        emailErrorMessage.className = 'show show-in';
    } else if (emailInput.value.length > 30) {
        emailInput.className = 'invalid';
        emailErrorMessage.style = 'display: block';
        emailErrorMessage.innerHTML = 'Field "email" should contains lesser then 30 letters!';
        emailErrorMessage.className = 'show show-in';
    } else {
        emailInput.className = 'valid';
        emailErrorMessage.style = '';
        emailErrorMessage.className = 'show show-out';
    }
    validForm();
}

function validMessageInput(event) {
    if (messageInput.value.trim() == '') {
        messageInput.className = 'invalid';
        usermessageErrorMessage.style = 'display: block';
        usermessageErrorMessage.innerHTML = 'Field "message" should not be empty!';
        usermessageErrorMessage.className = 'show show-in';
    } else if (messageInput.value.length > 150) {
        messageInput.className = 'invalid';
        usermessageErrorMessage.style = 'display: block';
        usermessageErrorMessage.innerHTML = 'Field "message" should contains lesser then 150 letters!';
        usermessageErrorMessage.className = 'show show-in';
    } else if (messageInput.value.length < 10) {
        messageInput.className = 'invalid';
        usermessageErrorMessage.style = 'display: block';
        usermessageErrorMessage.innerHTML = 'Field "message" should contains more then 10 letters!';
        usermessageErrorMessage.className = 'show show-in';
    } else {
        messageInput.className = 'valid';
        usermessageErrorMessage.style = '';
        usermessageErrorMessage.className = 'show show-out';
    }
    validForm();
}

function validForm() {
    if ((nameInput.classList.contains('valid')) && (surnameInput.classList.contains('valid')) &&
        (emailInput.classList.contains('valid')) && (messageInput.classList.contains('valid'))) {
            sendButton.className = 'enabled';
            sendButton.disabled = false;
    } else {
            sendButton.className = 'disabled';
            sendButton.value = 'Send';
            sendButton.disabled = true;
    }
}

function sendMessageForm(event) {
    event.preventDefault();
    let i = 0;
    
    let waitAnim = setInterval(() => {
        sendButton.value = 'Wait' + '.'.repeat((i++) % 4);
    }, 250);

    const jsonData = {};
    const formData = new FormData(event.currentTarget);

    for (let inp of formData.entries()) {
        jsonData[inp[0]] = inp[1];
    }

    // jsonData['name'] = nameInput.value;
    // jsonData['surname'] = surnameInput.value;
    // jsonData['email'] = emailInput.value;
    // jsonData['message'] = messageInput.value;

    const jsonString = JSON.stringify(jsonData);
    console.log(jsonString);

    setTimeout(() => {
        clearInterval(waitAnim);
        sendButton.className = 'sended';
        sendButton.value = 'Send successfully!';
        sendButton.disabled = true;
    }, 1000);
}

nameInput.addEventListener('input', validNameInput);
surnameInput.addEventListener('input', validSurnameInput);
emailInput.addEventListener('input', validEmailInput);
messageInput.addEventListener('input', validMessageInput);

contactMeButton.addEventListener('click', openContactFormPopup);
closeButton.addEventListener('click', closeContactFormPopup);

sendForm.addEventListener('submit', sendMessageForm);