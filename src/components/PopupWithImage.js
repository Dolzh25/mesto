import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(data) {
    super.open()
    this._caption.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
  }
}
