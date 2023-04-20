export default class Popup {
  constructor(popupSelrctor) {
    this._popup = document.querySelector(popupSelrctor);
    this._popupList = document.querySelectorAll(popupSelrctor);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._popupList.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
          this.closePopup(popup);
        }
      });
    });
  }
}
