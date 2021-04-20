const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formSelectors.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSelectors.inputErrorClass);
  errorElement.classList.remove(formSelectors.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.value === '') {
    hideInputError(formElement, inputElement);
  } else {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      if (inputElement.value === '') {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      }
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formSelectors.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(formSelectors.inactiveButtonClass);
  }
};

const enableValidation = (formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListeners(formElement);
};
