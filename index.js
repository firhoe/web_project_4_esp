import {initialCards, selectors} from './scripts/utils.js';
import Card from './scripts/Card.js';
import Popup from './scripts/Popup.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import FormValidator from './scripts/FormValidator.js';

const cardList = document.querySelector('.cards__container');

export const popUp = document.querySelectorAll('.popup');

initialCards.forEach((item) => {
  const newCard = new Card(item.name, item.link, '.card-template');
  const cardElement = newCard.generateCard();
  cardList.appendChild(cardElement);
});

const validate = new FormValidator({});
validate.enableValidation();
const formularios = Array.from(document.querySelectorAll('.popup__container'));
formularios.forEach((elemento) => {
  elemento.addEventListener('input', (evt) => {
    validate.enableValidation();
  });
});

const cards = document.querySelectorAll('.card__image');
cards.forEach((card) => {
  card.addEventListener('click', (evt) => {
    previewPopup.open({
      title: evt.target.alt,
      image: evt.target.src,
    });
  });
});

const addCardPopup = new Popup('.popup_add_card');
addCardPopup.setEventListeners();

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => addCardPopup.open());

const closeAddCardButton = addCardPopup._popupElement.querySelector('.popup__card-close-button');
closeAddCardButton.addEventListener('click', () => addCardPopup.close());

function updateUserInfo(inputValues) {
  document.getElementById('popup-input-name').textContent = inputValues.name;
  document.getElementById('popup-input-about').textContent = inputValues.occupation;
}

const editPopup = new PopupWithForm('.popup_edit_profile', (inputValues) => {
  updateUserInfo(inputValues);
});

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  editPopup.open();
});

editPopup.setEventListeners();

const previewPopup = new PopupWithImage('.popup_preview_image');
previewPopup.setEventListeners();

const form = document.querySelector('.popup__form');

const formValidatorEditProfile = new FormValidator(form, selectors);
formValidatorEditProfile.enableValidation();

///////////////////////////// INDEX.JS ANTIGUO ///////////////////////////////////

// // Seleccionar contenedor de cartas
// const cardsContainer = document.querySelector('.cards__container');

// // Seleccionar template de las cartas
// const cardTemplate = document.querySelector('.card-template').content;

// // Seleccionar popupPreviewImage de las cartas
// const popupPreviewImage = document.querySelector('.popup_preview_image');
// const closePreviewImage = popupPreviewImage.querySelector('.popup__preview-close-button');

// closePreviewImage.addEventListener('click', () => closePopUp(popupPreviewImage));

// // Iterar sobre las cartas existentes y agrega la carta
// initialCards.forEach((item) => {
//   addCard(item);
// });

// function handleCardSubmit(evt) {
//   evt.preventDefault();
//   const nameElement = document.querySelector('#popup-input-title');
//   const linkElement = document.querySelector('#popup-input-link');
//   const item = {
//     name: nameElement.value,
//     link: linkElement.value,
//   };

//   if (!nameElement.validity.valid) {
//     return;
//   }

//   if (!linkElement.validity.valid) {
//     return;
//   }

//   addCard(item);
//   closePopUp(popupAddCard);
// }

// function addCard(item) {
//   // Clonar template card
//   const cardNode = cardTemplate.querySelector('.card').cloneNode(true);

//   // Agregar valores a la card
//   cardNode.querySelector('.card__title').textContent = item.name;
//   cardNode.querySelector('.card__image').src = item.link;

//   // Events
//   const deleteBtn = cardNode.querySelector('.card__delete-button');
//   deleteBtn.addEventListener('click', () => {
//     cardNode.remove();
//   });

//   const likeBtn = cardNode.querySelector('.card__like-button');
//   likeBtn.addEventListener('click', () => {
//     likeBtn.classList.toggle('card__like-button_on');
//   });

//   const cardImage = cardNode.querySelector('.card__image');
//   cardImage.addEventListener('click', () => openPopUp(popupPreviewImage));

//   cardNode.querySelector('.card__image').addEventListener('click', function () {
//     const popupImage = document.querySelector('.popup__image');
//     const popupCaption = document.querySelector('.popup__caption');

//     popupImage.src = item.link;
//     popupCaption.textContent = item.name;
//   });

//   // Agregar carta al contenerdor
//   cardsContainer.prepend(cardNode);
// }

// const submitCardButton = document.querySelector('.popup__create-card-button');

// submitCardButton.addEventListener('click', handleCardSubmit);

// // initiates popup add Card
// const openAddCardButton = document.querySelector('.profile__add-button');
// const popupAddCard = document.querySelector('.popup_add_card');
// const closeAddCardButton = popupAddCard.querySelector('.popup__card-close-button');

// openAddCardButton.addEventListener('click', () => openPopUp(popupAddCard));
// closeAddCardButton.addEventListener('click', () => closePopUp(popupAddCard));

// // initiates profile editor popup profile Edit
// const openFormButton = document.querySelector('.profile__edit-button');
// const popupEditProfile = document.querySelector('.popup_edit_profile');
// const closeButton = popupEditProfile.querySelector('.popup__close-button');

// openFormButton.addEventListener('click', () => openPopUp(popupEditProfile));
// closeButton.addEventListener('click', () => closePopUp(popupEditProfile));

// // initiates profile editor popup save button

// const form = document.querySelector('.popup__form');

// const profileName = document.querySelector('.profile__user');
// const profileAbout = document.querySelector('.profile__profession');

// const inputName = document.getElementById('popup-input-name');
// const inputAbout = document.getElementById('popup-input-about');

// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   if (!inputName.validity.valid) {
//     return;
//   }
//   if (!inputAbout.validity.valid) {
//     return;
//   }
//   profileName.textContent = inputName.value;
//   profileAbout.textContent = inputAbout.value;
//   closePopUp(popupEditProfile);
// }

// form.addEventListener('submit', handleFormSubmit);

// function openPopUp(htmlObj) {
//   htmlObj.classList.add('popup_opened');
//   document.addEventListener('keydown', escKey);
// }

// function closePopUp(htmlObj) {
//   htmlObj.classList.remove('popup_opened');
//   document.removeEventListener('keydown', escKey);
// }

// function escKey(evt) {
//   if (evt.key === 'Escape') {
//     closePopUp(popupAddCard);
//     closePopUp(popupPreviewImage);
//     closePopUp(popupEditProfile);
//   }
// }

// const previewBackground = document.querySelector('#popup__background-preview');
// const editBackground = document.querySelector('#popup__background-edit');
// const addBackground = document.querySelector('#popup__background-add');

// function closeClick(closeAdd) {
//   closePopUp(closeAdd);
// }

// previewBackground.addEventListener('click', () => {
//   closeClick(popupPreviewImage);
// });

// editBackground.addEventListener('click', () => {
//   closeClick(popupEditProfile);
// });

// addBackground.addEventListener('click', () => {
//   closeClick(popupAddCard);
// });
