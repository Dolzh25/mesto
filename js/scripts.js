(() => {
  const editProfile = document.querySelector('.user__button-edit');
  const name = document.querySelector('.user__name');
  const about = document.querySelector('.user__about');
  const popup = document.querySelector('.popup');
  const formName = popup.querySelector('#name');
  const formAbout = popup.querySelector('#about');
  const form = popup.querySelector('.form');
  const popupClose = popup.querySelector('.popup__close');

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
