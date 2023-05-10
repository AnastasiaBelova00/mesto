import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button-submit');
  }

  setSubmitAction(action) {
    this._submitFunction = action;
  }

  renderDeleting(isDeleting) {
    if (isDeleting === true) {
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = 'Да';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction();
    });
  }
}
