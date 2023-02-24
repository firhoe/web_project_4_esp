export default class Card {
  constructor({data, handleCardClick, callbacks, user}, template) {
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes.length;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._user = user;
    this._handleCardClick = handleCardClick;
    this._callbacks = callbacks;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  addHeart() {
    const heartButton = this._cardElement.querySelector('.card__like-button');
    heartButton.classList.add('card__like-button_on');
  }

  removeHeart() {
    const heartButton = this._cardElement.querySelector('.card__like-button');
    heartButton.classList.remove('card__like-button_on');
  }

  // _toggleHearts() {
  //   const heartButton = this._cardElement.querySelector('.card__like-button');
  //   const heartCounter = this._cardElement.querySelector('.card__like-counter');

  //   heartButton.classList.toggle('card__like-button_on');
  //   heartCounter.textContent = this._likes.length;
  // }

  _deleteButton() {
    const trashButton = this._cardElement.querySelector('.card__delete-button');
    trashButton.closest('.card').remove();
  }

  updateLikes(resArray) {
    return (this._likes = resArray);
  }

  _setEventListeners() {
    this._cardElement.querySelector('.card__like-button').addEventListener('click', () => {
      const callbacks = this._callbacks.likesHandler();
      const userLiked = this._likes.some((item) => item._id === this._user._id);
      const handler = userLiked ? callbacks.removeLike : callbacks.addLike;

      const heartCounter = this._cardElement.querySelector('.card__like-counter');

      handler.then((result) => {
        if (result.likes.some((item) => item._id === this._user._id)) {
          this.addHeart();
        } else {
          this.removeHeart();
        }
        this.updateLikes(result.likes);
        heartCounter.textContent = result.likes.length;
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
    });
  }

  _isOwner() {
    return this._owner._id === this._id;
  }

  _hasOwnerLike() {
    return this._likes.some((item) => {
      return item.owner && item.owner._id === this._user._id;
    });
  }

  userLiked = () => {
    return this._likes.some((element) => {
      return element._id === this._user._id;
    });
  };

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardElement.querySelector('.card__image').src = this._link;
    this._cardElement.querySelector('.card__image').alt = this._name;
    this._cardElement.querySelector('.card__like-counter').textContent = this._likes.length;

    if (this.userLiked()) {
      this.addHeart();
    }

    if (this._user === this._owner) {
      this._cardElement
        .querySelector('.card__delete-button')
        .classList.add('card__delete-button_active');
    }
    return this._cardElement;
  }
}
