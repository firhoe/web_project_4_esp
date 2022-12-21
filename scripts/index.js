// inicia 6 default cards

const initialCards = [
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

// Seleccionar contenedor de cartas
const cardsContainer = document.querySelector('.cards__container');

// Seleccionar template de las cartas
const cardTemplate = document.querySelector('.card-template').content;

// Seleccionar popupPreviewImage de las cartas
const popupPreviewImage = document.querySelector('.popup_preview_image');
const closePreviewImage = popupPreviewImage.querySelector('.popup__preview-close-button');

closePreviewImage.addEventListener('click', () => closePopUp(popupPreviewImage));

// Iterar sobre las cartas existentes y agrega la carta
initialCards.forEach((item) => {
  addCard(item);
});

function handleCardSubmit(evt) {
  evt.preventDefault();
  const nameElement = document.querySelector('#popup_input_title');
  const linkElement = document.querySelector('#popup_input_link');
  const item = {
    name: nameElement.value,
    link: linkElement.value,
  };

  if (!nameElement.validity.valid) {
    return;
  }

  if (!linkElement.validity.valid) {
    return;
  }

  addCard(item);
  closePopUp(popupAddCard);
}

function addCard(item) {
  // Clonar template card
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true);

  // Agregar valores a la card
  cardNode.querySelector('.card__title').textContent = item.name;
  cardNode.querySelector('.card__image').src = item.link;

  // Events
  const deleteBtn = cardNode.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', () => {
    cardNode.remove();
  });

  const likeBtn = cardNode.querySelector('.card__like-button');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('card__like-button_on');
  });

  const cardImage = cardNode.querySelector('.card__image');
  cardImage.addEventListener('click', () => openPopUp(popupPreviewImage));

  cardNode.querySelector('.card__image').addEventListener('click', function () {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');

    popupImage.src = item.link;
    popupCaption.textContent = item.name;
  });

  // Agregar carta al contenerdor
  cardsContainer.prepend(cardNode);
}

const submitCardButton = document.querySelector('.popup__create-card-button');

submitCardButton.addEventListener('click', handleCardSubmit);

// initiates popup add Card
const openAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add_card');
const closeAddCardButton = popupAddCard.querySelector('.popup__card-close-button');

openAddCardButton.addEventListener('click', () => openPopUp(popupAddCard));
closeAddCardButton.addEventListener('click', () => closePopUp(popupAddCard));

// initiates profile editor popup profile Edit
const openFormButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const closeButton = popupEditProfile.querySelector('.popup__close-button');

openFormButton.addEventListener('click', () => openPopUp(popupEditProfile));
closeButton.addEventListener('click', () => closePopUp(popupEditProfile));

// initiates profile editor popup save button

const form = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__user');
const profileAbout = document.querySelector('.profile__profession');

const inputName = document.getElementById('popup_input_name');
const inputAbout = document.getElementById('popup_input_about');

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (!inputName.validity.valid) {
    return;
  }

  if (!inputAbout.validity.valid) {
    return;
  }

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopUp(popupEditProfile);
}

form.addEventListener('submit', handleFormSubmit);

function openPopUp(htmlObj) {
  htmlObj.classList.add('popup_opened');
}

function closePopUp(htmlObj) {
  htmlObj.classList.remove('popup_opened');
}

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopUp(popupAddCard);
    closePopUp(popupPreviewImage);
    closePopUp(popupEditProfile);
  }
});

// Cerrar popup ups con click en superposicion
const popUpBackground = document.querySelectorAll('.popup__background');
console.log(popUpBackground);

popUpBackground.forEach((element) => {
  element.addEventListener('click', (evt) => {
    console.log('here');
    closePopUp(popupAddCard);
    closePopUp(popupPreviewImage);
    closePopUp(popupEditProfile);
  });
});

// popUpBackground.addEventListener('click', (evt) => {
//   closePopUp(popupAddCard);
//   closePopUp(popupPreviewImage);
//   closePopUp(popupEditProfile);
// });
