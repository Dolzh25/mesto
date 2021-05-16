export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleButtonClose = this._handleButtonClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');

    this._closeButton.removeEventListener('click', this._handleButtonClose);
    window.removeEventListener('keydown', this._handleEscClose);
  }

  _handleButtonClose() {
    this.close();
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this._handleButtonClose);
    window.addEventListener('keydown', this._handleEscClose);
  }
}
