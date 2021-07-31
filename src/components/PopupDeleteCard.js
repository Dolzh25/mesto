import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popup, handlerSubmit) {
    super(popup);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitForm = this._submitForm.bind(this);
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  setSubmitButtonText(text) {
    if (text) {
      return this._submitButton.textContent = text;
    }

    return this._submitButton.textContent = this._submitButtonText;
  }

  open(data, element) {
    super.open();
    this._data = data;
    this._element = element;
    this._form.addEventListener('submit', this._submitForm);
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handlerSubmit(this._data, this._element);
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
