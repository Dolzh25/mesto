import '../pages/style.css';
import {
  formSelectors,
  openEditProfileBtn,
  addPostButton,
  popupProfileForm,
  popupAddPostForm,
  gallerySelector,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  changeAvatarBtn
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-26`,
  headers: {
    authorization: 'db449291-21f4-4a20-a3b2-35b6ac710f3e',
    'Content-Type': 'application/json',
  }
});

const handleDeleteCard = (data, element) => {
  popupDeleteCard.setSubmitButtonText('Удаление...');
  api.removeCard(data)
    .then(() => {
      popupDeleteCard.close();
      element.remove();
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      popupDeleteCard.setSubmitButtonText();
    })
}

const popupDeleteCard = new PopupDeleteCard('#delete-post', handleDeleteCard);
popupDeleteCard.setEventListeners();


const handlePushLike = (id, method) => {
  return api.pushLike(id, method)
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
}

let owner = null;

const createCard = (data, selectorTemplate, handler) => {
  const card = new Card(
    data,
    selectorTemplate,
    () => {
      handler.open(data);
    },
    (data, element) => {
      popupDeleteCard.open(data, element);
    },
    handlePushLike,
    owner
  );

  return card.generateCard();
}

const cardList = new Section({
  renderer: (data) => {
    const card = createCard(data, '#post', popupWithImage);
    cardList.addItem(card);
  }
}, gallerySelector);

const popupWithImage = new PopupWithImage('#fullscreen-post');
popupWithImage.setEventListeners();

const onAddPostFormSubmit = (values) => {
  const data = {
    name: values['post-name'],
    link: values['post-image']
  }

  popupAddPost.setSubmitButtonText('Сохранение...');
  api.addNewCard(data)
    .then((data) => {
      const card = createCard(data, '#post', popupWithImage);
      cardList.addItem(card);
      popupAddPost.close();
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      popupAddPost.setSubmitButtonText();
    })
};

const popupAddPost = new PopupWithForm('#add-post', onAddPostFormSubmit);
popupAddPost.setEventListeners();

const onButtonAddClick = () => {
  popupAddPost.open();
  addCardFormValidator.checkInputOpenPopup();
};

const userProfile = new UserInfo(userNameSelector, userAboutSelector, userAvatarSelector);

const setUserProfileValues = () => {
  const data = userProfile.getUserInfo();
  popupProfile.setInputValues(data);
};

const onProfileFormSubmit = () => {
  const data = popupProfile.getInputValues();
  popupProfile.setSubmitButtonText('Сохранение...');
  api.setProfileInfo(data)
    .then((data) => {
      userProfile.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      popupProfile.setSubmitButtonText();
    })
};

const popupProfile = new PopupWithForm('#profile', onProfileFormSubmit);
popupProfile.setEventListeners();

const onEditProfileClick = () => {
  popupProfile.open();
  setUserProfileValues();
  profileFormValidator.checkInputOpenPopup();
};

openEditProfileBtn.addEventListener('click', onEditProfileClick);
addPostButton.addEventListener('click', onButtonAddClick);

const profileFormValidator = new FormValidator(formSelectors, popupProfileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formSelectors, popupAddPostForm);
addCardFormValidator.enableValidation();

const handleAvatarPopupSubmit = (data) => {
  changeAvatarPopup.setSubmitButtonText('Сохранение...');
  api.changeAvatar(data)
    .then((res) => {
      userProfile.setUserAvatar(res);
      changeAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
    .finally(() => {
      changeAvatarPopup.setSubmitButtonText();
    })
}

const changeAvatarPopup = new PopupWithForm('#avatar', handleAvatarPopupSubmit);
changeAvatarPopup.setEventListeners();

changeAvatarBtn.addEventListener('click', () => {
  changeAvatarPopup.open();
});

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then((res) => {
    owner = res[0]._id;
    popupProfile.setInputValues(res[0]);
    userProfile.setUserInfo(res[0]);
    cardList.renderItems(res[1].reverse());
  })
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  })
