import '../pages/style.css';
import {
  formSelectors,
  openEditProfileBtn,
  addPostButton,
  popupProfileForm,
  popupAddPostForm,
  gallerySelector
} from '../utils/constants.js';
import initialCards from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const createCard = (data, selectorTemplate, handler) => {
  const card = new Card(data, selectorTemplate, () => {
    handler.open(data);
  });
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (data) => {

    const card = createCard(data, '#post', popupWithImage);
    cardList.addItem(card);
  }
}, gallerySelector);

const popupWithImage = new PopupWithImage('#fullscreen-post');

const onAddPostFormSubmit = (values) => {
  const data = {
    name: values['post-name'],
    link: values['post-image']
  }

  const card = createCard(data, '#post', popupWithImage);
  cardList.addItem(card);

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
