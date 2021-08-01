export default class Card {
  constructor(data, selectorTemplate, handleOpenPopup, handleDeletePopup, handlePushLike, owner) {
    this._data = data;
    this._selectorTemplate = selectorTemplate;
    this._handleOpenPopup = handleOpenPopup;
    this._handleDeletePopup = handleDeletePopup;
    this._handlePushLike = handlePushLike;
    this._owner = owner;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.post')
      .cloneNode(true);

    return cardElement;
  }

  _updateLikeCount(data) {
    this._likeCount.textContent = data.likes.length;
  }

  _putLikeCard() {
    if (this._likeButton.classList.contains('post__like-btn_active')) {
      this._handlePushLike(this._data._id, 'DELETE')
        .then((res) => {
          this._updateLikeCount(res);
          this._likeButton.classList.remove('post__like-btn_active');
        })
    } else {
      this._handlePushLike(this._data._id, 'PUT')
        .then((res) => {
          this._updateLikeCount(res);
          this._likeButton.classList.add('post__like-btn_active');
        })
    }
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._putLikeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeletePopup(this._data, this._element);
    });
    this._imageElement.addEventListener('click', () => {
      this._handleOpenPopup(this._data.link, this._data.name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.post__image');
    this._titleElement = this._element.querySelector('.post__title');
    this._likeButton = this._element.querySelector('.post__like-btn');
    this._likeCount = this._element.querySelector('.post__like-count');
    this._deleteButton = this._element.querySelector('.post__delete');
    this._setEventListeners();

    if (this._owner === this._data.owner._id) {
      this._deleteButton.classList.add('post__delete_show');
    }

    this._data.likes.forEach(like => {
      // console.log(like, this._owner);
      if (like._id === this._owner) {
        this._likeButton.classList.add('post__like-btn_active');
      }
    });

    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._titleElement.textContent = this._data.name;
    this._likeCount.textContent = this._data.likes.length;

    return this._element;
  }

  _showError = (err) => {
    console.log(err);
    return Promise.reject(err);
  };
}
