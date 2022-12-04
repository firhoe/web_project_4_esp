// initiates 6 default cards

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

const cardsContainer = document.querySelector('.cards__container');

initialCards.forEach(function (item) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true);
  cardNode.querySelector('.card__title').textContent = item.name;
  cardNode.querySelector('.card__image').src = item.link;
  cardsContainer.append(cardNode);
});

function handleCardSubmit(e) {
  e.preventDefault();
  const placeNameInput = document.querySelector('#popup_input_title');
  const placeLinkInput = document.querySelector('#popup_input_link');
  const cardTemplate = document.querySelector('.card-template').content;
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true);
  cardNode.querySelector('.card__title').textContent = placeNameInput.value;
  cardNode.querySelector('.card__image').src = placeLinkInput.value;
  cardsContainer.prepend(cardNode);
  toggleFormAddCard();
}

const submitCardButton = document.querySelector('.popup__create-card-button');

submitCardButton.addEventListener('click', handleCardSubmit);

// initiates popup add Card

const openAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add_card');
const closeAddCardButton = popupAddCard.querySelector(
  '.popup_add-card-close-button'
);

function toggleFormAddCard() {
  popupAddCard.classList.toggle('popup_opened');
}

openAddCardButton.addEventListener('click', toggleFormAddCard);
closeAddCardButton.addEventListener('click', toggleFormAddCard);

// initiates delete Cards

// initiates profile editor popup profile Edit

const openFormButton = document.querySelector('.profile__edit-button');
const popup_edit_profile = document.querySelector('.popup_edit_profile');
const closeButton = popup_edit_profile.querySelector('.popup__close-button');

function toggleForm() {
  popup_edit_profile.classList.toggle('popup_opened');
}

openFormButton.addEventListener('click', toggleForm);
closeButton.addEventListener('click', toggleForm);

// initiates profile editor popup save button

const form = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__user');
const profileAbout = document.querySelector('.profile__profession');

const inputName = document.getElementById('popup_input_name');
const inputAbout = document.getElementById('popup_input_about');

function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toggleForm();
}

form.addEventListener('submit', handleFormSubmit);
