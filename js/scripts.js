(() => {
  const editProfile = document.querySelector('.user__button-edit');
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

  const galleryList = document.querySelector('.gallery__list');
  const cardTemplate = document.querySelector('#post').content;

  const popupFullscreen = document.querySelector('#fullscreen-post');
  const fullscreenCloseButton = popupFullscreen.querySelector('.popup__close');
  const fullscreenImage = popupFullscreen.querySelector('.popup__image');
  const fullscreenCaption = popupFullscreen.querySelector('.popup__caption');

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const getPopupInputValue = input => input.textContent;

  const fillProfileForm = () => {
    formName.value = getPopupInputValue(name);
    formAbout.value = getPopupInputValue(about);
  };

  fillProfileForm();

  const createCard = (data) => {
    const cardElement = cardTemplate.cloneNode(true);
    const post = cardElement.querySelector('.post');
    const cardImg = cardElement.querySelector('.post__image');
    const cardTitle = cardElement.querySelector('.post__title');
    const likeButton = cardElement.querySelector('.post__like');
    const removeButton = cardElement.querySelector('.post__delete');

    cardImg.src = data.link;
    cardImg.alt = data.name;
    cardTitle.textContent = data.name;

    likeButton.addEventListener('click', putLikeCard);
    removeButton.addEventListener('click', removeCard);
    post.addEventListener('click', showFullImage);

    return cardElement;
  };

  const renderCard = (post) => {
    galleryList.prepend(post);
  };

  const renderCards = () => {
    initialCards.reverse().forEach((card) => {
      renderCard(createCard(card));
    });
  };

  const fillFullscreenPopup = (popup) => {
    const caption = popup.querySelector('.post__title').textContent;
    const image = popup.querySelector('.post__image');

    fullscreenCaption.textContent = caption;
    fullscreenImage.src = image.src;

    fullscreenCloseButton.addEventListener('click', () => {
      closePopup(popupFullscreen);
      fullscreenImage.src = '';
      fullscreenCaption.textContent = '';
    });
  }

  const showFullImage = function (evt) {
    const image = this.querySelector('.post__image');

    if (evt.target === image) {
      openPopup(popupFullscreen);
      fillFullscreenPopup(this);
    }
  }

  const putLikeCard = function () {
    this.classList.toggle('post__like_active');
  };

  const removeCard = function () {
    const post = this.closest('.post');
    post.remove();
  }

  renderCards();

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

  const setNewValues = () => {
    name.textContent = formName.value;
    about.textContent = formAbout.value;
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

  const onProfileFormSubmit = function (evt) {
    evt.preventDefault();
    setNewValues();
    closePopup(popupProfile);
    this.removeEventListener('submit', onProfileFormSubmit);
  };

  const onEditProfileClick = () => {
    openPopup(popupProfile);
    fillProfileForm();

    popupProfileForm.addEventListener('submit', onProfileFormSubmit);
  };

  const onAddPostFormSubmit = function (evt) {
    evt.preventDefault();
    const data = {
      name: popupAddPostName.value,
      link: popupAddPostLink.value
    }

    renderCard(createCard(data));

    closePopup(popupAddPost);
    popupAddPostName.value = '';
    popupAddPostLink.value = '';

    this.removeEventListener('submit', onAddPostFormSubmit);
  };

  const onButtonAddClick = () => {
    openPopup(popupAddPost);

    popupAddPostForm.addEventListener('submit', onAddPostFormSubmit);
  };

  editProfile.addEventListener('click', onEditProfileClick);
  addPostButton.addEventListener('click', onButtonAddClick);
})();
