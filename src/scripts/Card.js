export default class Card {
  constructor(
    {data, handleCardClick, handleDeleteClick, handleLikeAdd, handleLikeDelete, userId},
    template
  ) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._id = data._id;
    this._likesCount = data.likes.length;
    this._ownerId = data.owner._id;
    this._user = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDelete = handleLikeDelete;
    this._likesArray = data.likes;
    this._cardLikes = data.likes.length;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  addHeart() {
    const heartButton = this._element.querySelector('.card__like-button');
    const heartNumber = this._element.querySelector('.card__like-counter');

    heartButton.classList.add('card__like-button_on');
    heartNumber.textContent = this._likesArray.length;
  }

  removeHeart() {
    const heartButton = this._element.querySelector('.card__like-button');
    const heartNumber = this._element.querySelector('.card__like-counter');

    heartButton.classList.remove('card__like-button_on');
    heartNumber.textContent = this._likesArray.length;
    if (this._cardLikes === 0) {
      heartNumber.textContent = '';
    }
  }

  _deleteButton() {
    const trashButton = this._element.querySelector('.card__delete-button');
    trashButton.closest('.card').remove();
  }

  updateLikes(resArray) {
    return (this._likesArray = resArray);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      if (
        this._likesArray.some((like) => {
          return like._id === this._user;
        })
      ) {
        this._handleLikeDelete({
          id: this._id,
        });
      } else {
        this._handleLikeAdd({
          id: this._id,
        });
      }
    });

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteClick({
        id: this._id,
      });
    });

    this._element.querySelector('.card__image').addEventListener('click', () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    );

    if (this._ownerId !== this._user) {
      this._element.querySelector('.card__delete-button').remove();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    this._element.querySelector('.card__title').textContent = this._name;
    cardImage.src = this._link;
    cardImage.setAttribute('alt', this._name);

    if (this._cardLikes > 0) {
      this._element.querySelector('.card__like-counter').textContent = this._cardLikes;
    } else {
      this._element.querySelector('.card__like-counter').textContent = '';
    }

    if (
      this._likesArray.some((like) => {
        return like._id === this._user;
      })
    ) {
      const heartButton = this._element.querySelector('.card__like-button');
      heartButton.classList.add('card__like-button_on');
    } else {
      const heartButton = this._element.querySelector('.card__like-button');
      heartButton.classList.remove('card__like-button_on');
    }
    return this._element;
  }
}
