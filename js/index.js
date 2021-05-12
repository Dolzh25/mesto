import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const openEditProfileBtn = document.querySelector('.user__button-edit');
const name = document.querySelector('.user__name');
const about = document.querySelector('.user__about');
const addPostButton = document.querySelector('.user__button-add');

const popupProfile = document.querySelector('#profile');
const popupProfileForm = popupProfile.querySelector('#profile form');
const formName = popupProfile.querySelector('#name-input');
const formAbout = popupProfile.querySelector('#about-input');

const popupAddPost = document.querySelector('#add-post');
const popupAddPostForm = popupAddPost.querySelector('#add-post form');
const popupAddPostName = popupAddPost.querySelector('#post-name');
const popupAddPostLink = popupAddPost.querySelector('#post-image');

const popupFullscreen = document.querySelector('#fullscreen-post');
const fullscreenCloseButton = popupFullscreen.querySelector('.popup__close');
const fullscreenImage = popupFullscreen.querySelector('.popup__image');
const fullscreenCaption = popupFullscreen.querySelector('.popup__caption');

const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

const getPopupInputValue = input => input.textContent;

const onEscPress =  (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup(popup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', onPopupCloseButtonClick);
  window.addEventListener('keydown', onEscPress);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', onPopupCloseButtonClick);
  window.removeEventListener('keydown', onEscPress);
};

const onPopupCloseButtonClick = function (evt) {
  const closeButton = this.querySelector('.popup__close');
  if (evt.target === closeButton) {
    closePopup(this);
  }
  if (evt.target === this) {
    closePopup(this);
  }
};

const fillProfileForm = () => {
  formName.value = getPopupInputValue(name);
  formAbout.value = getPopupInputValue(about);
};

const setUserProfileValues = () => {
  name.textContent = formName.value;
  about.textContent = formAbout.value;
};

const onProfileFormSubmit = function (evt) {
  evt.preventDefault();
  setUserProfileValues();
  closePopup(popupProfile);
  this.removeEventListener('submit', onProfileFormSubmit);
};

const onEditProfileClick = () => {
  fillProfileForm();
  openPopup(popupProfile);
  const formProfile = document.querySelector('.form[name="profile"]');
  const form = new FormValidator(formSelectors, formProfile);
  form.checkInputOpenPopup(formProfile);

  popupProfileForm.addEventListener('submit', onProfileFormSubmit);
};

const onAddPostFormReset = () => {
  popupAddPostForm.reset();
};

const onAddPostFormSubmit = function (evt) {
  evt.preventDefault();
  const data = {
    name: popupAddPostName.value,
    link: popupAddPostLink.value
  }

  const card = new Card(data, '#post');
  galleryLists.prepend(card.generateCard());

  closePopup(popupAddPost);

  this.removeEventListener('submit', onAddPostFormSubmit);
};

fullscreenCloseButton.addEventListener('click', () => {
  closePopup(popupFullscreen);
  fullscreenImage.src = '';
  fullscreenCaption.textContent = '';
});

const onButtonAddClick = () => {
  onAddPostFormReset();
  openPopup(popupAddPost);

  popupAddPostForm.addEventListener('submit', onAddPostFormSubmit);
};

openEditProfileBtn.addEventListener('click', onEditProfileClick);
addPostButton.addEventListener('click', onButtonAddClick);

const galleryLists = document.querySelector('.gallery__list');
const formList = document.querySelectorAll('.form');

initialCards.reverse().forEach((data) => {
  const card = new Card(data, '#post');
  galleryLists.prepend(card.generateCard());
});

formList.forEach((formElement) => {
  const form = new FormValidator(formSelectors, formElement);
  form.enableValidation();
})