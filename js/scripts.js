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
      galleryList.append(newCard);
    });
  };

  const renderNewCard = (post) => {
    galleryList.prepend(post);
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
    console.log(post);
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
