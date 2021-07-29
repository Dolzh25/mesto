import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popup, handlerSubmit) {
    super(popup);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.form');
    // this._submitForm = this._submitForm.bind(this);
  }

  // _submitForm(evt, data) {
  //   evt.preventDefault();
  //   this._handlerSubmit();
  // }

  setEventListeners() {
    super.setEventListeners();
    // this._form.addEventListener('submit', this._submitForm);
  }
}
