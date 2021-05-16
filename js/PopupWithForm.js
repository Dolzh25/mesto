import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handlerSubmit) {
    super(popup);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    this._inputsValue = {};
    this._inputList = this._form.querySelectorAll('.form__input');
    this._inputList.forEach(input => {
      return this._inputsValue[input.name] = input.value;
    });
    return this._inputsValue;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
