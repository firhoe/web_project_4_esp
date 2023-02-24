export default class Card {
  constructor(
    {data, handleCardClick, handleDeleteClick, handleLikeAdd, handleLikeDelete, user},
    template
  ) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._id = data._id;
    this._owner = data.owner;
    this._user = user;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeAdd = handleLikeAdd;
    this._hadleLikeDelete = handleLikeDelete;
    this._likes = data.likes;
    this._cardLikes = data.likes.length;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
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
    this._cardElement.querySelector('.card__like-button').addEventListener('click', () => {
      if (this._hasOwnerLike()) {
        this._callbacks.deleteLikeHaaandler().then(() => {
          this._toggleHearts();
        });
      } else {
        this._callbacks.likeHandler().then(() => {
          this._toggleHearts();
        });
      }
    });
    if (this._isOwner()) {
      this._cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        this._callbacks.deleteHandler().then(() => {
          this._deleteButton();
        });
      });
    }
    this._cardElement.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick({
        title: this._name,
        image: this._link,
      });
    });
  }

  _isOwner() {
    return this._owner._id === this._user._id;
  }

  _hasOwnerLike() {
    return this._likes.some((item) => {
      return item.owner._id === this._user._id;
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardElement.querySelector('.card__image').src = this._link;
    this._cardElement.querySelector('.card__image').alt = this._name;
    this._cardElement.querySelector('.card__like-heart').textContent = this._likes.length;
    this._setEventListeners();
    return this._cardElement;
  }
}
