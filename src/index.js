import './pages/index.css';
import {
  initialCards,
  selectors,
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
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';

export const addCardPopup = new Popup('.popup_add_card');

export const editPopup = new PopupWithForm('.popup_edit_profile', updateUserInfo);

// renderiza las 6 tarjetas iniciales aparescan, tiene habilitado el boton like y eliminar card
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const newCard = new Card(
        {
          data,
          handleCardClick: ({title, image}) => {
            previewPopup.open({title, image});
          },
        },
        '.card-template'
      );
      const cardElement = newCard.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  '.cards__container'
);

cardSection.renderer();

// instancia para la clase UserInfo
const profileUser = new UserInfo({
  userName: '.profile__user',
  userOcupation: '.profile__profession',
});

profileUser.getUserInfo();

// instancia para la clase FormValidator
formsElements.forEach((form) => {
  const formValidator = new FormValidator(form, selectors);
  formValidator.enableValidation();
});

// crear nueva tarjeta y se configura para enviar el formulario
export const addNewCard = new PopupWithForm({
  popupSelector: '.popup_add_card',
  handleFormSubmit: (data) => {
    const newCard = new Card(
      {
        data,
        handleCardClick: ({title, image}) => {
          previewPopup.open({title, image});
        },
      },
      '.card-template'
    );
    const cardElement = newCard.generateCard();
    cardSection.addItem(cardElement);
  },
});

addNewCard.setEventListeners();

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
addFormCard.addEventListener('submit', (event) => {
  handleAddCardSubmit(event);
});
