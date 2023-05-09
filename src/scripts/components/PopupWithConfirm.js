import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = document.querySelector(
      '.popup__button-submit_type_confirm'
    );
  }
}
