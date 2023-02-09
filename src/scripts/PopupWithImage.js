import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({title, image}) {
    this._popupElement.querySelector('.popup__image').src = image;
    this._popupElement.querySelector('.popup__caption').textContent = title;
    this._popupElement.querySelector('.popup__image').setAttribute('alt', title);
    super.open();
  }

  close() {
    super.close();
  }
}

const previewPopup = new PopupWithImage('.popup_preview_image');

export default previewPopup;
