(() => {
  const editProfile = document.querySelector('.user__button-edit');
  const name = document.querySelector('.user__name');
  const about = document.querySelector('.user__about');
  const popup = document.querySelector('.popup');
  const formName = popup.querySelector('#name');
  const formAbout = popup.querySelector('#about');
  const form = popup.querySelector('.form');
  const popupClose = popup.querySelector('.popup__close');
  const galleryList = document.querySelector('.gallery__list');
  const cardTemplate = document.querySelector('#post').content;

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

  renderCards();


  const openPopup = () => {
    popup.classList.add('popup_opened');

    formName.value = getPopupInputValue(name);
    formAbout.value = getPopupInputValue(about);

    form.addEventListener('submit', setNewValues);

    popupClose.addEventListener('click', closePopup);
  };

  const setNewValues = (evt) => {
    evt.preventDefault();
    name.textContent = formName.value;
    about.textContent = formAbout.value;
    closePopup();
  };

  const closePopup = () => {
    popup.classList.remove('popup_opened');
    popupClose.removeEventListener('click', closePopup);
    form.removeEventListener('submit', setNewValues);
  };

  const getPopupInputValue = input => input.textContent;

  editProfile.addEventListener('click', openPopup);
})();
