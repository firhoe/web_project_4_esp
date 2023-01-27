import Card from './Card.js';
import {editPopup} from '../index.js';

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
const cards = document.querySelectorAll('.card');

// Eventos

cards.forEach((card) => {
  card.addEventListener('click', (evt) => {
    console.log('Card clicked');
    previewPopup.open({
      title: evt.target.alt,
      image: evt.target.src,
    });
  });
});

// Funciones

export function handleEditSubmit(event) {
  event.preventDefault();
  const inputValues = {
    name: form.elements.name.value,
    about: form.elements.about.value,
  };
  updateUserInfo(inputValues);
  editPopup.close();
}

export function handleAddCardSubmit(event) {
  event.preventDefault();
  console.log(form); // no se que esta agarrando :(
  const name = form.elements.name.value;
  const link = form.elements.link.value;
  addNewCard(name, link);
  addCardPopup.close();
}

export function updateUserInfo(inputValues) {
  document.querySelector('.profile__user').textContent = inputValues.name;
  document.querySelector('.profile__profession').textContent = inputValues.about;
}

export function addNewCard(name, link) {
  const newCard = new Card(name, link, '.card-template');
  const cardElement = newCard.generateCard();
  cardList.appendChild(cardElement);
}
