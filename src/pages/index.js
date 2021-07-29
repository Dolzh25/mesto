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
import PopupAvatar from '../components/PopupAvatar';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-26`,
  headers: {
    authorization: 'db449291-21f4-4a20-a3b2-35b6ac710f3e',
    'Content-Type': 'application/json',
  }
});

const popupDeleteCard = new PopupDeleteCard('#delete-post', () => {

});

const handlePushLike = (id, method) => {
  return api.pushLike(id, method)
}

let owner = null;

const createCard = (data, selectorTemplate, handler) => {
  const card = new Card(
    data,
    selectorTemplate,
    () => {
        handler.open(data);
        handler.setEventListeners();
      },
    () => {
      popupDeleteCard.open();
      popupDeleteCard.setEventListeners();

      popupDeleteCard._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        api.removeCard(data)
          .then((res) => {
            card.removeCard();
            popupDeleteCard.close();
          })
      });
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

const onAddPostFormSubmit = (values) => {
  const data = {
    name: values['post-name'],
    link: values['post-image']
  }

  api.addNewCard(data)
    .then((data) => {
      const card = createCard(data, '#post', popupWithImage);
      cardList.addItem(card);
    })

  popupAddPost.close();
};

const popupAddPost = new PopupWithForm('#add-post', onAddPostFormSubmit);

const onButtonAddClick = () => {
  popupAddPost.open();
  popupAddPost.setEventListeners();
  addCardFormValidator.checkInputOpenPopup();
};

const userProfile = new UserInfo(userNameSelector, userAboutSelector, userAvatarSelector);

const setUserProfileValues = () => {
  const data = userProfile.getUserInfo();
  popupProfile.setInputValues(data);
};

const onProfileFormSubmit = () => {
  const data = popupProfile.getInputValues();

  api.setProfileInfo(data)
    .then((data) => {
      userProfile.setUserInfo(data);
    })
  popupProfile.close();
};

const popupProfile = new PopupWithForm('#profile', onProfileFormSubmit);


const onEditProfileClick = () => {
  popupProfile.open();
  popupProfile.setEventListeners();
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
  api.changeAvatar(data)
    .then((res) => {
      userProfile.setUserAvatar(res);
      changeAvatarPopup.close();
    })
}

const changeAvatarPopup = new PopupAvatar('#avatar', handleAvatarPopupSubmit);

changeAvatarBtn.addEventListener('click', () => {
  changeAvatarPopup.open();
  changeAvatarPopup.setEventListeners();
});

api
  .getInitialCards()
  .then((data) => {
    cardList.renderItems(data.reverse());
  })

api.getProfileInfo()
  .then((data) => {
    popupProfile.setInputValues(data);
    userProfile.setUserInfo(data);
    owner = data._id;
  })
