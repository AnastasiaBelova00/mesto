import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

import './index.css';

import fisht from '../images/fisht.jpg';
import spb from '../images/spb.jpg';
import adigeya from '../images/adigeya.jpg';
import balaklava from '../images/balaklava.jpg';
import oshten from '../images/oshten.jpg';
import gumbashi from '../images/gumbashi.jpg';

//массив
const cards = [
  {
    name: 'Приют Фишт',
    link: fisht,
  },
  {
    name: 'Санкт-Петербург',
    link: spb,
  },
  {
    name: 'Адыгея',
    link: adigeya,
  },
  {
    name: 'Балаклава',
    link: balaklava,
  },
  {
    name: 'Оштен',
    link: oshten,
  },
  {
    name: 'Перевал Гумбаши',
    link: gumbashi,
  },
];

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
const nameInput = document.querySelector('.popup__input_el_name'); //редактирование имени
const descriptionInput = document.querySelector('.popup__input_el_description'); //редактирование описания
const buttonAddCard = document.querySelector('.profile__button-add'); //кнопка добавления карточки
const formAddCard = document.forms['addCardForm']; //форма редактирования попапа
const nameAddImput = document.querySelector('.popup__input_el_name-card'); //поле имени попапа места
const linkImput = document.querySelector('.popup__input_el_link-card'); //поле адреса попапа места

//отрисовка 6 карточек
const cardList = new Section(
  {
    items: cards,
    renderer: (item) => {
      const card = new Card(item, '.card-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.setItem(cardElement);
    },
  },
  '.elements'
);
cardList.renderItems();

//открытие зум-попапа
const popupZoomImage = new PopupWithImage('.popup_type_image');
popupZoomImage.setEventListeners();

//клик по карточке
function handleCardClick(name, link) {
  popupZoomImage.open(name, link);
}

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

//создание карточки
function createCard(data) {
  const card = new Card(data, '.card-template', handleCardClick);
  return card.generateCard();
}

//сабмит формы добавления карточки
function handleFormSubmitAdd() {
  const cardData = {
    name: nameAddImput.value,
    link: linkImput.value,
  };
  const card = createCard(cardData);
  cardList.setItem(card);
  popupAddCard.close();
}

//информация о пользователе
const userInfo = new UserInfo({
  userInputName: '.profile__name',
  userInputDescription: '.profile__description',
});

//кнопка открытия попапа редактирования//
buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.open();
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  descriptionInput.value = profileInfo.description;
});

function handleFormSubmitEdit() {
  userInfo.setUserInfo(nameInput.value, descriptionInput.value);
  popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm(
  '.popup_type_profile',
  handleFormSubmitEdit
);
popupEditProfile.setEventListeners();

//валидация
const profileFormValidator = new FormValidator(formEditProfile, config);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(formAddCard, config);
cardFormValidator.enableValidation();
