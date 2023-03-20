const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//вывести ошибки в инпуте
const showInputError = (
  form,
  input,
  inputErrorClass,
  errorClass,
  errorMessage
) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(errorClass);
};

//скрыть ошибки в инпуте
const hideInputError = (form, input, inputErrorClass, errorClass) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '';
};

//проверка на валидацию и показ/скрытие ошибок
const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(
      form,
      input,
      config.inputErrorClass,
      config.errorClass,
      input.validationMessage
    );
  } else {
    hideInputError(form, input, config.inputErrorClass, config.errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//кнопки
const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }
};

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, button, config.inactiveButtonClass);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
};

enableValidation(validationSettings);
