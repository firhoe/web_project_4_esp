import './pages/index.css';
import {
  selectors,
  cardTemplate,
  openFormProfile,
  inputName,
  inputOcupation,
  formEdit,
  formImage,
  formProfileImage,
  profileTitle,
  profileProfession,
  profileImage,
  openCardButton,
  addCardSubmitButton,
  deleteCardSubmitButton,
  editProfileSubmitButton,
  profileImageSubmitButton,
  profileImageOverlay,
} from './scripts/utils.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupDeleteImage from './scripts/PopupDeleteImage.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';
import Api from './scripts/Api.js';

const profilePopupValidator = new FormValidator(formEdit, selectors);
const imagePopupValidator = new FormValidator(formImage, selectors);
const profileImagePopupValidator = new FormValidator(formProfileImage, selectors);

profilePopupValidator.enableValidation();
imagePopupValidator.enableValidation();
profileImagePopupValidator.enableValidation();

export const previewPopup = new PopupWithImage('.popup_preview_image');
previewPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: '.popup_edit_profile',
  handleFormSubmit: (data) => {
    api
      .setUserInfo({name: data.username, about: data.userocupation})
      .then(() => {
        profileUser.setUserInfo({username: data.username, userocupation: data.userocupation});
        editPopup.close();
      })
      .catch((err) => console.log(err));
  },
  submitButton: editProfileSubmitButton,
});

editPopup.setEventListeners();

export const profileUser = new UserInfo({
  userName: profileTitle,
  userOcupation: profileProfession,
  userAvatar: profileImage,
});

openFormProfile.addEventListener('click', () => {
  const {userName, userOcupation} = profileUser.getUserInfo();
  inputName.value = userName;
  inputOcupation.value = userOcupation;
  editPopup.open();
  profilePopupValidator.resetValidation();
});

export const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/web_es_cohort_04',
  headers: {
    authorization: 'c3631954-8031-4a1f-b1bb-1315bd763fc8',
    'Content-Type': 'application/json',
  },
});

api
  .getUserInfo()
  .then((res) => {
    profileUser.setUserInfo({username: res.name, userocupation: res.about});
    profileUser.setUserAvatar(res.avatar);
    profileUser.userId = res._id;
  })
  .then(() => {
    api
      .getCardList()
      .then((res) => {
        const cardSection = new Section(
          {
            items: res,
            renderer: (data) => {
              const cardElement = createCard(data);
              cardSection.addCards(cardElement);
            },
          },
          '.cards__container'
        );
        cardSection.renderer();

        const addCardPopup = new PopupWithForm({
          popupSelector: '.popup_add_card',
          handleFormSubmit: (data) => {
            api
              .addCard(data)
              .then((data) => {
                const newCardElement = createCard(data);
                cardSection.addItem(newCardElement);
                addCardPopup.close();
              })
              .catch((err) => console.log(err));
          },
          submitButton: addCardSubmitButton,
        });

        addCardPopup.setEventListeners();

        openCardButton.addEventListener('click', () => {
          addCardPopup.open();
          imagePopupValidator.resetValidation();
        });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

const profileImagePopup = new PopupWithForm({
  popupSelector: '.popup_image_profile',
  handleFormSubmit: (data) => {
    const {profileimage: avatar} = data;
    api
      .setUserAvatar(avatar)
      .then(() => {
        profileUser.setUserAvatar(avatar);
        profileImagePopup.close();
      })
      .catch((err) => console.log(err));
  },
  submitButton: profileImageSubmitButton,
});

profileImagePopup.setEventListeners();

profileImageOverlay.addEventListener('click', () => {
  profileImagePopup.open();
  profileImagePopupValidator.resetValidation();
});

export const deleteCardPopup = new PopupDeleteImage({
  popupSelector: '.popup_delete_card',
  submitButton: deleteCardSubmitButton,
});

deleteCardPopup.setEventListeners();

function createCard(data) {
  const newCard = new Card(
    {
      data,
      handleCardClick: ({name, link}) => {
        previewPopup.open({name, link});
      },
      handleDeleteClick: ({id}) => {
        deleteCardPopup.open();
        deleteCardPopup.setSubmitAction(() => {
          api
            .removeCard(id)
            .then(() => {
              deleteCardPopup.close();
              newCard.deleteButton();
            })
            .catch((err) => console.log(err));
        });
      },
      handleLikeAdd: ({id}) => {
        api
          .addLike(id)
          .then((res) => {
            newCard.updateLikes(res.likes);
            newCard.addHeart();
          })
          .catch((err) => console.log(err));
      },
      handleLikeDelete: ({id}) => {
        api
          .removeLike(id)
          .then((res) => {
            newCard.updateLikes(res.likes);
            newCard.removeHeart();
          })
          .catch((err) => console.log(err));
      },
      userId: profileUser.userId,
    },
    cardTemplate
  );
  return newCard.generateCard();
}

// const cardSection = new Section(
//   {
//     items: [],
//     renderer: (data) => {
//       const newCard = new Card(
//         {
//           data,
//           handleCardClick: ({name, link}) => {
//             previewPopup.open({name, link});
//           },
//           callbacks: {
//             deleteHandler() {
//               return api.deleteCard(data._id);
//             },
//             likesHandler() {
//               return {addLike: api.addLike(data._id), removeLike: api.removeLike(data._id)};
//             },
//           },
//           user: userInfo,
//         },
//         '.card-template'
//       );
//       const cardElement = newCard.generateCard();
//       cardSection.addItem(cardElement);
//     },
//   },
//   '.cards__container'
// );

// instancia para la clase FormValidator
// formsElements.forEach((form) => {
//   const formValidator = new FormValidator(form, selectors);
//   formValidator.enableValidation();
// });
