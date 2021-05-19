import '../pages/style.css';
import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const openEditProfileBtn = document.querySelector('.user__button-edit');
const addPostButton = document.querySelector('.user__button-add');
const popupProfileForm = document.querySelector('#profile form');
const popupAddPostForm = document.querySelector('#add-post form');

const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (data) => {

    const card = new Card(data, '#post', popupWithImage.open);

    cardList.addItem(card.generateCard());
  }
}, '.gallery__list');

const popupWithImage = new PopupWithImage('#fullscreen-post');

const onAddPostFormSubmit = (values) => {
  const data = {
    name: values['post-name'],
    link: values['post-image']
  }

  const card = new Card(data, '#post', popupWithImage.open);
  cardList.addItem(card.generateCard());

  popupAddPost.close();
};

const popupAddPost = new PopupWithForm('#add-post', onAddPostFormSubmit);

const onButtonAddClick = () => {
  popupAddPost.open();
  addCardFormValidator.checkInputOpenPopup();
};

const userProfile = new UserInfo('.user__name', '.user__about');

const setUserProfileValues = () => {
  const data = userProfile.getUserInfo();
  popupProfile.setInputValues(data);
};

const onProfileFormSubmit = (data) => {
  userProfile.setUserInfo(data);
  popupProfile.close();
};

const popupProfile = new PopupWithForm('#profile', onProfileFormSubmit);

const onEditProfileClick = () => {
  popupProfile.open();
  setUserProfileValues();
  profileFormValidator.checkInputOpenPopup();
};

openEditProfileBtn.addEventListener('click', onEditProfileClick);
addPostButton.addEventListener('click', onButtonAddClick);

cardList.renderItems();

const profileFormValidator = new FormValidator(formSelectors, popupProfileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formSelectors, popupAddPostForm);
addCardFormValidator.enableValidation();
