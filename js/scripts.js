(() => {
  const editProfile = document.querySelector('.user__button-edit');
  const name = document.querySelector('.user__name');
  const about = document.querySelector('.user__about');
  const popup = document.querySelector('.popup');
  const formName = popup.querySelector('#name');
  const formAbout = popup.querySelector('#about');
  const galleryList = document.querySelector('.gallery__list');
  const cardTemplate = document.querySelector('#post').content;
  const addPostButton = document.querySelector('.user__button-add');
  const fullscreenPopup = document.querySelector('#fullscreen-post');

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

  const createCard = (name, link) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImg = cardElement.querySelector('.post__image');
    const cardTitle = cardElement.querySelector('.post__title');

    cardImg.src = link;
    cardImg.alt = name;
    cardTitle.textContent = name;
    return cardElement;
  };

  const renderCards = () => {
    initialCards.forEach((card) => {
      const newCard = createCard(card.name, card.link);
      const likeButton = newCard.querySelector('.post__like');
      const removeButton = newCard.querySelector('.post__delete');
      const post = newCard.querySelector('.post');

      likeButton.addEventListener('click', putLikeCard);
      removeButton.addEventListener('click', removeCard);
      post.addEventListener('click', showFullImage);
      galleryList.append(newCard);
    });
  };

  const renderNewCard = (post) => {
    const likeButton = post.querySelector('.post__like');
    const removeButton = post.querySelector('.post__delete');
    const postElement = post.querySelector('.post');

    likeButton.addEventListener('click', putLikeCard);
    removeButton.addEventListener('click', removeCard);
    postElement.addEventListener('click', showFullImage);
    galleryList.prepend(post);
  }

  const fillFullscreenPopup = (popup) => {
    const caption = popup.querySelector('.post__title').textContent;
    const image = popup.querySelector('.post__image');
    const closeButton = fullscreenPopup.querySelector('.popup__close');

    popupCaption = fullscreenPopup.querySelector('.popup__caption');
    popupCaption.textContent = caption;

    popupImage = fullscreenPopup.querySelector('.popup__image');
    popupImage.src = image.src;

    closeButton.addEventListener('click', () => {
      closePopup(fullscreenPopup);
      popupImage.src = '';
      popupCaption.textContent = '';
    });
  }

  const showFullImage = function (evt) {
    const image = this.querySelector('.post__image');
    const closePopup = this.querySelector('.popup__close');

    if (evt.target === image) {
      openPopup(fullscreenPopup);
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

  const openPopup = (popup) => {
    popup.classList.add('popup_opened');
  };

  const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', onPopupCloseButtonClick);
  };

  const fillProfileForm = () => {
    formName.value = getPopupInputValue(name);
    formAbout.value = getPopupInputValue(about);
  };

  const setNewValues = () => {
    name.textContent = formName.value;
    about.textContent = formAbout.value;
  };

  const getPopupInputValue = input => input.textContent;

  const onPopupCloseButtonClick = function (evt) {
    const closeButton = this.querySelector('.popup__close');
    if (evt.target === closeButton) {
      closePopup(this);
    }
  };

  const onProfileFormSubmit = function (evt) {
    evt.preventDefault();
    const popup = this.closest('.popup');
    setNewValues();
    closePopup(popup);
    this.removeEventListener('submit', onProfileFormSubmit);
  };

  const onEditProfileClick = () => {
    const popup = document.querySelector('#profile');
    const form = popup.querySelector('.form');

    openPopup(popup);
    fillProfileForm();

    form.addEventListener('submit', onProfileFormSubmit);
    popup.addEventListener('click', onPopupCloseButtonClick);
  };

  const onAddPostFormSubmit = function (evt) {
    evt.preventDefault();
    const popup = this.closest('.popup');

    const name = this.querySelector('#post-name').value;
    const imageLink = this.querySelector('#post-image').value;

    const post = createCard(name, imageLink);
    renderNewCard(post);

    closePopup(popup);
    this.removeEventListener('submit', onProfileFormSubmit);
  };

  const onButtonAddClick = () => {
    const popup = document.querySelector('#add-post');
    const form = popup.querySelector('.form');
    openPopup(popup);


    form.addEventListener('submit', onAddPostFormSubmit);
    popup.addEventListener('click', onPopupCloseButtonClick);
  };

  editProfile.addEventListener('click', onEditProfileClick);
  addPostButton.addEventListener('click', onButtonAddClick);
})();
