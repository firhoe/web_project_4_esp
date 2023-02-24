import './pages/index.css';
import {selectors, formsElements, updateUserInfo} from './scripts/utils.js';
import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import FormValidator from './scripts/FormValidator.js';
import previewPopup from './scripts/PopupWithImage.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import Api from './scripts/Api.js';

export const addCardPopup = new PopupWithForm('.popup_add_card', handleAddCardSubmit);

export const editPopup = new PopupWithForm('.popup_edit_profile', updateUserInfo);

const api = new Api({
  token: 'c3631954-8031-4a1f-b1bb-1315bd763fc8',
  url: 'https://around.nomoreparties.co/v1/web_es_cohort_04',
});

// instancia para la clase UserInfo
const profileUser = new UserInfo({
  userName: '.profile__user',
  userOcupation: '.profile__profession',
});

/// Mover despues
profileUser.getUserInfo();

let userInfo;
api.getUserInfo().then((result) => {
  userInfo = result;
  console.log('userInfo', userInfo);
});

// const userLiked = (data) => {
//   return data.likes.some((element) => {
//     console.log('liked??', element === userInfo._id);
//     return element._id === userInfo._id;
//   });
// };

const cardSection = new Section(
  {
    items: [],
    renderer: (data) => {
      const newCard = new Card(
        {
          data,
          handleCardClick: ({title, image}) => {
            previewPopup.open({title, image});
          },
          callbacks: {
            deleteHandler() {
              return api.deleteCard(data._id);
            },
            likesHandler() {
              return {addLike: api.addLike(data._id), removeLike: api.removeLike(data._id)};
            },
          },
          user: userInfo,
        },
        '.card-template'
      );
      const cardElement = newCard.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  '.cards__container'
);

api.getCardsList().then((cardsResult) => {
  cardSection.setItems(cardsResult);
  cardSection.renderer();
});

function handleAddCardSubmit() {
  const addFormCard = document.querySelector('#form-card');
  const title = addFormCard.querySelector('#popup-input-title').value;
  const image = addFormCard.querySelector('#popup-input-link').value;

  api.addCard(title, image).then((card) => {
    cardSection.prepend(card);
  });
}
// instancia para la clase FormValidator
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
