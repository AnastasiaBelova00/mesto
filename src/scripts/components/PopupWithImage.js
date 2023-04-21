import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._heading = this._popup.querySelector('.popup__image-heading');
    this._image = this._popup.querySelector('.popup__image');
  }

  openPopup(name, link) {
    this._heading.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.openPopup();
  }
}
