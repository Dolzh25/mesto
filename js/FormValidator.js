export default class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  checkInputOpenPopup() {
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      this.toggleButtonState();
    });
  };

  _checkInputValidity(inputElement) {
    if (inputElement.value === '') {
      this._hideInputError(inputElement);
    } else {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  };

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  }
}
