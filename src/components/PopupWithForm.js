import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handlerSubmit) {
    super(popup);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitForm = this._submitForm.bind(this);
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._submitButtonText = this._submitButton.textContent;
    this._inputsValue = {};
  }

  getInputValues() {
    this._inputList.forEach(input => {
      return this._inputsValue[input.name] = input.value;
    });
    return this._inputsValue;
  }

  setSubmitButtonText(text) {
    if (text) {
      return this._submitButton.textContent = text;
    }

    return this._submitButton.textContent = this._submitButtonText;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      this._form.querySelector(`input[name=${input.name}]`).value = data[input.name];
    });
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handlerSubmit(this.getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
