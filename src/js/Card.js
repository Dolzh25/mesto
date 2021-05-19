export default class Card {
  constructor(data, selectorTemplate, handleOpenPopup) {
    this._data = data;
    this._selectorTemplate = selectorTemplate;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.post')
      .cloneNode(true);

    return cardElement;
  }

  _putLikeCard() {
    this._likeButton.classList.toggle('post__like_active');
  }

  _removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._putLikeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._removeCard();
    });
    this._imageElement.addEventListener('click', () => {
      this._handleOpenPopup(this._data.link, this._data.name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.post__image');
    this._titleElement = this._element.querySelector('.post__title');
    this._likeButton = this._element.querySelector('.post__like');
    this._deleteButton = this._element.querySelector('.post__delete');
    this._setEventListeners();

    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._titleElement.textContent = this._data.name;

    return this._element;
  }
}
