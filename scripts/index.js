// initiates profile editor popup

const openFormButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');

function toggleForm() {
  popup.classList.toggle('popup_opened');
}

openFormButton.addEventListener('click', toggleForm);
closeButton.addEventListener('click', toggleForm);

// initiates profile editor popup save button

const form = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__user');
const profileAbout = document.querySelector('.profile__profession');

const inputName = document.getElementById('popup_input_name');
const inputAbout = document.getElementById('popup_input_about');

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toggleForm();
}

form.addEventListener('submit', handleFormSubmit);
