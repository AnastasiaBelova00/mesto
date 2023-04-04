export { config, disableButton, hideInputError };

//параметры для валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//вывести ошибки в инпуте
const showInputError = (form, input, errorMessage, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);
};

//скрыть ошибки в инпуте
const hideInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
};

//проверка на валидацию и показ/скрытие ошибок
const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

//проверка инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//сабмит
const toggleButtonState = (inputList, button, config) => {
  if (hasInvalidInput(inputList, config)) {
    disableButton(button, config);
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
};

//удаление стиля с кнопки
function disableButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

//слушатели
const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, button, config);
    });
  });
};

//включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
};

enableValidation(config);
