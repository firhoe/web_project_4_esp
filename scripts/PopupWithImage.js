import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({title, image}) {
    this._popupElement.querySelector('.popup__image').src = image;
    this._popupElement.querySelector('.popup__caption').textContent = title;
    this._popupElement.querySelector('.popup__image').setAttribute('alt', title);
    super.open();
  }
}
