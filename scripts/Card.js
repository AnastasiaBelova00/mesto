export default class Card {
  constructor(data, cardTemplateElement, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateElement = cardTemplateElement;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._cardTemplateElement)
      .content.querySelector('.element')
      .cloneNode(true);

    return templateElement;
  }

  _handleCardLike() {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _handleCardDelete() {
    this._element.remove();
  }

  // _handleCardClick() {
  //   this._popupHeadingImage.textContent = this._name;
  //   this._popupZoomImage.src = this._link;
  //   this._popupZoomImage.alt = this._name;
  //   this._openPopup(popupImage);
  // }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._cardPicture);
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

    this._setEventListeners();

    return this._element;
  }
}
