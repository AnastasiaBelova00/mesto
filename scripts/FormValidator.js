export default class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  //вывести ошибки в инпуте
  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._config.errorClass);
  }

  //скрыть ошибки в инпуте
  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    error.classList.remove(this._config.errorClass);
    error.textContent = '';
  }

  //проверка на валидацию и показ/скрытие ошибок
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  //проверка инпутов
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //сабмит
  _toggleButtonState(inputList, button, config) {
    if (this._hasInvalidInput(inputList, config)) {
      this._disableButton(button, config);
    } else {
      this._enableButton(button, config);
    }
  }

  //удаление стиля с кнопки
  _disableButton() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  //добавление стиля кнопки
  _enableButton() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }

  //слушатели
  _setEventListeners(form, config) {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  //включение валидации
  enableValidation(config) {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(form, config);
  }
}
