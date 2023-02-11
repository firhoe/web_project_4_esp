export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    console.log;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _toggleHearts() {
    const heartButton = this._cardElement.querySelector('.card__like-button');
    heartButton.classList.toggle('card__like-button_on');
  }

  _deleteButton() {
    const trashButton = this._cardElement.querySelector('.card__delete-button');
    trashButton.closest('.card').remove();
  }
  _setEventListeners() {
    this._cardElement
      .querySelector('.card__like-button')
      .addEventListener('click', () => this._toggleHearts());
    this._cardElement
      .querySelector('.card__delete-button')
      .addEventListener('click', () => this._deleteButton());
    this._cardElement.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick({
        title: this._name,
        image: this._link,
      });
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardElement.querySelector('.card__image').src = this._link;
    this._cardElement.querySelector('.card__image').alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
