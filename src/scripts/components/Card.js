export default class Card {
  constructor(
    data,
    userId,
    cardTemplateElement,
    handleCardClick,
    handleLikeClick
    // handleDeleteIconClick,
    // handleDeleteLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._likes = data.likes;
    this.cardId = data._id; //карточка
    this._ownerId = data.owner._id; //владелец
    this._userId = userId; //пользователь

    this._cardTemplateElement = cardTemplateElement;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    // this._handleCardDelete = handleCardDelete;
    // this._handleDeleteIconClick = handleDeleteIconClick;
    // this._handleAddLike = handleAddLike;
    // this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._cardTemplateElement)
      .content.querySelector('.element')
      .cloneNode(true);

    return templateElement;
  }

  _handleCardDelete() {
    this._element.remove();
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  changeLikes() {
    if (this.isLiked()) {
      this._likeButton.classList.remove('element__button-like_active');
    } else {
      this._likeButton.classList.add('element__button-like_active');
    }
  }

  // setLikes() {
  //   this._likeButton.classList.add('element__button-like_active');
  // }

  // removeLikes() {
  //   this._likeButton.classList.remove('element__button-like_active');
  // }

  countUserLikes(data) {
    this._likeCounter.textContent = data.likes.length;
    this._likes = data.likes;
  }

  //отображение корзин
  _showDeleteButtonIcon() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this);
    });
    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPicture = this._element.querySelector('.element__image');
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;

    this._cardTitle = this._element.querySelector('.element__title');
    this._cardTitle.textContent = this._name;

    this._likeButton = this._element.querySelector('.element__button-like');
    this._deleteButton = this._element.querySelector('.element__button-delete');

    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeCounter.textContent = this._likes.length;

    this._showDeleteButtonIcon(); //отображаем корзины

    this._setEventListeners();

    return this._element;
  }
}
