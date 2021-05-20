export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleButtonClose = this._handleButtonClose.bind(this);
    this.open = this.open.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
    window.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }

  _handleButtonClose() {
    this.close();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this._handleButtonClose);
    this._popup.addEventListener('click', this._handleOverlayClick)
  }
}
