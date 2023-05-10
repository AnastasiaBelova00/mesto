import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';

import './index.css';
import { data } from 'autoprefixer';

//параметры для валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const buttonEditProfile = document.querySelector('.profile__button-edit'); //кнопка редактирования профиля
const formEditProfile = document.forms['editForm']; //форма редактирования попапа
const buttonAddCard = document.querySelector('.profile__button-add'); //кнопка добавления карточки
const formAddCard = document.forms['addCardForm']; //форма редактирования попапа
const buttonAvatar = document.querySelector('.profile__button-avatar'); //кнопка редактирования аватара
const formAvatar = document.forms['avatarForm']; //форма аватара
const submitProfileEdit = document.querySelector(
  '.popup__button-submit_type_edit'
);
const submitUserAvatar = document.querySelector(
  '.popup__button-submit_type_avatar'
);
const submitAddCard = document.querySelector(
  '.popup__button-submit_type_add-card'
);

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '9d9d46b1-d674-4200-a18f-5deb215f4e52',
    'Content-Type': 'application/json',
  },
});

//получение информации о пользователе
api
  .getUserInfo()
  .then((res) => (userId = res._id))
  .then((res) => userInfo.getUserInfo(res))
  .catch((err) => console.error(`Ошибка: ${err}`));

//получение всех карточек с сервера
api
  .getInitialCards()
  .then((res) => cardList.renderItems(res))
  .catch((err) => console.error(`Ошибка: ${err}`));

//информация о пользователе
const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserAbout: '.profile__description',
  selectorUserAvatar: '.profile__image',
});

//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
//кнопка открытия попапа редактирования//
buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.open();
  const profileInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues(profileInfo);
});

//сабмит редактирования
function handleFormSubmitEdit(data) {
  api
    .editUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      submitProfileEdit.textContent = 'Сохранить';
      popupEditProfile.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  submitProfileEdit.textContent = 'Сохранение...';
}

//попап редактирования и слушатели
const popupEditProfile = new PopupWithForm(
  '.popup_type_profile',
  handleFormSubmitEdit
);
popupEditProfile.setEventListeners();

//ПОПАП АВАТАРА
//сабмит аватара
function handleFormSubmitAvatar(data) {
  api
    .changeUserAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      submitUserAvatar.textContent = 'Сохранить';
      popupAvatar.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  submitUserAvatar.textContent = 'Сохранение...';
}

//попап редактирования аватара
const popupAvatar = new PopupWithForm(
  '.popup_type_avatar',
  handleFormSubmitAvatar
);
popupAvatar.setEventListeners();

//кнопка открытия попапа аватара
buttonAvatar.addEventListener('click', function () {
  cardFormValidator.resetValidation();
  popupAvatar.open();
});

//ПОПАП-ЗУМ
//открытие зум-попапа
const popupZoomImage = new PopupWithImage('.popup_type_image');
popupZoomImage.setEventListeners();

//клик по карточке
function handleCardClick(name, link) {
  popupZoomImage.open(name, link);
}

//ПОПАП НОВЫХ КАРТОЧЕК
//открытие попапа добавления карточек//
buttonAddCard.addEventListener('click', function () {
  cardFormValidator.resetValidation();
  popupAddCard.open();
});

//попап добавления новой карточки
const popupAddCard = new PopupWithForm(
  '.popup_type_add-card',
  handleFormSubmitAdd
);
popupAddCard.setEventListeners();

//создание экземпляра карточки
function createCard(data) {
  const newCard = new Card(
    data,
    userId,
    '.card-template',
    handleCardClick,
    handleLikeClick
  );

  return newCard.generateCard();
}

//функция лайков
function handleLikeClick(card) {
  if (!card.isLiked()) {
    api
      .addLike(card.cardId)
      .then((res) => {
        card.changeLikes();
        card.countUserLikes(res);
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  } else {
    api
      .deleteLike(card.cardId)
      .then((res) => {
        card.changeLikes();
        card.countUserLikes(res);
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }
}

//отрисовка карточек
const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardList.setItem(card);
    },
  },
  '.elements'
);

//сабмит формы добавления карточки
function handleFormSubmitAdd(data) {
  api
    .addCard(data)
    .then((res) => {
      const card = createCard(res);
      cardList.setItem(card);
      submitAddCard.textContent = 'Сохранить';
      popupAddCard.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  submitAddCard.textContent = 'Сохранение...';
}

//ВАЛИДАЦИЯ
const profileFormValidator = new FormValidator(formEditProfile, config);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(formAddCard, config);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formAvatar, config);
avatarFormValidator.enableValidation();
