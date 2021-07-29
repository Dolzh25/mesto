import Popup from './Popup.js';

export default class PopupAvatar extends Popup {
  constructor(popup, handlerSubmit) {
    super(popup);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitForm = this._submitForm.bind(this);
  }

  getInputValues() {
    this._input = this._form.querySelector('.form__input');
    return this._input.value;
  }

  setInputValues(data) {
    this._name = this._form.querySelector('#name-input');
    this._about = this._form.querySelector('#about-input');
    this._name.value = data.name;
    this._about.value = data.about;
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
