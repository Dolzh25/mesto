export {
  formSelectors,
  openEditProfileBtn,
  addPostButton,
  popupProfileForm,
  popupAddPostForm,
  gallerySelector,
  userNameSelector,
  userAboutSelector
}

const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

const openEditProfileBtn = document.querySelector('.user__button-edit');
const addPostButton = document.querySelector('.user__button-add');
const popupProfileForm = document.querySelector('#profile form');
const popupAddPostForm = document.querySelector('#add-post form');
const gallerySelector = '.gallery__list';
const userNameSelector = '.user__name';
const userAboutSelector = '.user__about';
