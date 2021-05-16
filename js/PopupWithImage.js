import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this._image = document.querySelector('.popup__image');
    this._caption = document.querySelector('.popup__caption');
  }

  open(link, caption) {
    super.open()
    this._caption.textContent = caption;
    this._image.src = link;
    this._image.alt = caption;
  }
}
