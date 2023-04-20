import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

//массив
const cards = [
  {
    name: 'Приют Фишт',
    link: './images/fisht.jpg',
  },
  {
    name: 'Санкт-Петербург',
    link: './images/spb.jpg',
  },
  {
    name: 'Адыгея',
    link: './images/adigeya.jpg',
  },
  {
    name: 'Балаклава',
    link: './images/balaklava.jpg',
  },
  {
    name: 'Оштен',
    link: './images/oshten.jpg',
  },
  {
    name: 'Перевал Гумбаши',
    link: './images/gumbashi.jpg',
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

// const popups = document.querySelectorAll('.popup'); //все попапы
// const popupProfile = document.querySelector('.popup_type_profile'); //попап профиля
const buttonEditProfile = document.querySelector('.profile__button-edit'); //кнопка редактирования профиля
const profileName = document.querySelector('.profile__name'); //имя профиля
const profileDescription = document.querySelector('.profile__description'); //описание профиля
const formEditProfile = document.forms['editForm']; //форма редактирования попапа
const nameInput = document.querySelector('.popup__input_el_name'); //редактирование имени
const descriptionInput = document.querySelector('.popup__input_el_description'); //редактирование описания

//попап добавления карточек
const buttonAddCard = document.querySelector('.profile__button-add'); //кнопка добавления карточки
// const popupAddCard = document.querySelector('.popup_type_add-card'); //попап добавления карточек
const formAddCard = document.forms['addCardForm']; //форма редактирования попапа
// const elementsContainer = document.querySelector('.elements'); //контейнер карточек
const nameAddImput = document.querySelector('.popup__input_el_name-card'); //поле имени попапа места
const linkImput = document.querySelector('.popup__input_el_link-card'); //поле адреса попапа места
// const buttonSubmitAddCard = document.querySelector(
//   '.popup__button-submit_type_add-card'
// ); //сабмит попапа места

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
  popupZoomImage.openPopup(name, link);
}

//открытие попапа добавления карточек//
buttonAddCard.addEventListener('click', function () {
  cardFormValidator.resetValidation();
  popupAddCard.openPopup();
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
  popupAddCard.closePopup();
}

//информация о пользователе
const userInfo = new UserInfo({
  userInputName: '.profile__name',
  userInputDescription: '.profile__description',
});

//кнопка открытия попапа редактирования//
buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.openPopup();
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  descriptionInput.value = profileInfo.description;
});

function handleFormSubmitEdit() {
  popupEditProfile.closePopup();
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
