export default class Card {
  constructor(data, selectorTemplate) {
    this._data = data;
    this._selectorTemplate = selectorTemplate;
    this._onEscPress = this._onEscPress.bind(this);
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
    this._element.querySelector('.post__like').classList.toggle('post__like_active');
  }

  _removeCard() {
    this._element.remove();
  }

  _showfullImage() {
    this._openPopup();
  }

  _fillFullscreenPopup() {
    document.querySelector('#fullscreen-post').querySelector('.popup__image').src = this._data.link;
    document.querySelector('#fullscreen-post').querySelector('.popup__image').alt = this._data.name;
    document.querySelector('#fullscreen-post').querySelector('.popup__caption').textContent = this._data.name;
  }

  _openPopup() {
    document.querySelector('#fullscreen-post').classList.add('popup_opened');
    this._fillFullscreenPopup();

    document.querySelector('#fullscreen-post').querySelector('.popup__close').addEventListener('click', this._closePopup);
    window.addEventListener('keydown', this._onEscPress);
  }

  _closePopup() {
    document.querySelector('#fullscreen-post').classList.remove('popup_opened');

    document.querySelector('#fullscreen-post').querySelector('.popup__close').removeEventListener('click', this._closePopup);
    window.removeEventListener('keydown', this._onEscPress);
  }

  _onEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _setEventListeners() {
    this._element.querySelector('.post__like').addEventListener('click', () => {
      this._putLikeCard();
    });
    this._element.querySelector('.post__delete').addEventListener('click', () => {
      this._removeCard();
    });
    this._element.querySelector('.post__image').addEventListener('click', () => {
      this._showfullImage();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.post__image').src = this._data.link;
    this._element.querySelector('.post__image').alt = this._data.name;
    this._element.querySelector('.post__title').textContent = this._data.name;

    return this._element;
  }
}
