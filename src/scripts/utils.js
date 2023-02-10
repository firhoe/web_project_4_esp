//import Card from './Card.js';
import {editPopup, addCardPopup, addNewCard} from '../index.js';

export const initialCards = [
  {
    name: 'Valle de Yosemite',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lago Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Montañas Calvas',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Parque Nacional de la Vanoise',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
];

export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Variables

export const cardList = document.querySelector('.cards__container');
export const popUp = document.querySelectorAll('.popup');
export const form = document.querySelector('.popup__form');
export const formsElements = document.querySelectorAll('.popup__form');

// Funciones

export function updateUserInfo(inputValues) {
  document.querySelector('.profile__user').textContent = inputValues.name;
  document.querySelector('.profile__profession').textContent = inputValues.about;
}

export function handleEditSubmit(event) {
  event.preventDefault();
  const inputValues = {
    name: form.elements.name.value,
    about: form.elements.about.value,
  };
  updateUserInfo(inputValues);
  editPopup.close();
  event.target.reset();
}

export function handleAddCardSubmit(event) {
  event.preventDefault();
  const addFormCard = document.querySelector('#form-card');
  const inputname = addFormCard.querySelector('#popup-input-title').value;
  const inputlink = addFormCard.querySelector('#popup-input-link').value;

  addNewCard(inputname, inputlink);
  addCardPopup.close();
  event.target.reset();
}
