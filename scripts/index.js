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

closePreviewImage.addEventListener('click', togglePreviewImage);

function togglePreviewImage() {
  popupPreviewImage.classList.toggle('popup_opened');
}

// Iterar sobre las cartas existentes y agrega la carta
initialCards.forEach((item) => {
  addCard(item);
});

function togglePreviewImage() {
  popupPreviewImage.classList.toggle('popup_opened');
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: document.querySelector('#popup_input_title').value,
    link: document.querySelector('#popup_input_link').value,
  };
  addCard(item);
  toggleFormAddCard();
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
  cardImage.addEventListener('click', togglePreviewImage);

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

function toggleFormAddCard() {
  popupAddCard.classList.toggle('popup_opened');
}

openAddCardButton.addEventListener('click', toggleFormAddCard);
closeAddCardButton.addEventListener('click', toggleFormAddCard);

// initiates profile editor popup profile Edit
const openFormButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const closeButton = popupEditProfile.querySelector('.popup__close-button');

function toggleForm() {
  popupEditProfile.classList.toggle('popup_opened');
}

openFormButton.addEventListener('click', toggleForm);
closeButton.addEventListener('click', toggleForm);

// initiates profile editor popup save button

const form = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__user');
const profileAbout = document.querySelector('.profile__profession');

const inputName = document.getElementById('popup_input_name');
const inputAbout = document.getElementById('popup_input_about');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toggleForm();
}

form.addEventListener('submit', handleFormSubmit);
