import {
  initialCards,
  selectors,
  cardList,
  form,
  formsElements,
  updateUserInfo,
  handleEditSubmit,
  handleAddCardSubmit,
} from './scripts/utils.js';
import Card from './scripts/Card.js';
import Popup from './scripts/Popup.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import FormValidator from './scripts/FormValidator.js';
import previewPopup from './scripts/PopupWithImage.js';

export const addCardPopup = new Popup('.popup_add_card');

export const editPopup = new PopupWithForm('.popup_edit_profile', updateUserInfo);

// este forEach hace que las 6 tarjetas iniciales aparescan, tiene habilitado el boton like y eliminar card
initialCards.forEach((item) => {
  const newCard = new Card(item.name, item.link, '.card-template');
  const cardElement = newCard.generateCard();
  cardList.appendChild(cardElement);
});

formsElements.forEach((form) => {
  const formValidator = new FormValidator(form, selectors);
  formValidator.enableValidation();
});

// abrir formulario agregar tarjeta
const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  addCardPopup.open();
});

// abrir formulario editar perfil
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  editPopup.open();
});

// cerrar formulario agregar card
const closeAddCardButton = addCardPopup._popupElement.querySelector('.popup__card-close-button');
closeAddCardButton.addEventListener('click', () => addCardPopup.close());

// cerrar formulario editar perfil
const closeEditProfile = editPopup._popupElement.querySelector('.popup__close-button');
closeEditProfile.addEventListener('click', () => editPopup.close());

// cerrar popupPreviewImage
const closePreviewImage = previewPopup._popupElement.querySelector('.popup__preview-close-button');
closePreviewImage.addEventListener('click', () => previewPopup.close());

// variables para agarrar los backgrounds de cada popup
const previewBackground = document.querySelector('#popup__background-preview');
const editBackground = document.querySelector('#popup__background-edit');
const addBackground = document.querySelector('#popup__background-add');

// agregar evento de popup para que se cierre formulario si haces click fuera de el
previewBackground.addEventListener('click', () => previewPopup.close());
editBackground.addEventListener('click', () => editPopup.close());
addBackground.addEventListener('click', () => addCardPopup.close());

// llamas a los eventos para que cierren los popups si haces click fuera de el
addCardPopup.setEventListeners();
editPopup.setEventListeners();
previewPopup.setEventListeners();

// está asociando dos eventos "submit" a dos elementos diferentes del DOM
const addFormCard = document.querySelector('#form-card');
form.addEventListener('submit', handleEditSubmit);
addFormCard.addEventListener('submit', () => {
  handleAddCardSubmit();
});
