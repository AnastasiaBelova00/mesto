import Card from './Card.js';
import { config, disableButton, hideInputError } from './validation.js';

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

const popupProfile = document.querySelector('.popup_type_profile'); //попап профиля
const buttonEditProfile = document.querySelector('.profile__button-edit'); //кнопка редактирования профиля
const popupCloseButtons = document.querySelectorAll('.popup__button-exit'); //кнопки закрытия попапа
const profileName = document.querySelector('.profile__name'); //имя профиля
const profileDiscription = document.querySelector('.profile__discription'); //описание профиля
const formEditProfile = document.querySelector('#editForm'); //форма редактирования попапа
const nameInput = document.querySelector('.popup__input_el_name'); //редактирование имени
const jobInput = document.querySelector('.popup__input_el_discription'); //редактирование описания

//попап добавления карточек
const buttonAddCard = document.querySelector('.profile__button-add'); //кнопка добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card'); //попап добавления карточек
const formAddCard = document.querySelector('#addCardForm'); //форма редактирования попапа
const elementsContainer = document.querySelector('.elements'); //контейнер карточек
const cardTemplate = document
  .querySelector('.card-template')
  .content.querySelector('.element'); //отдельная карточка
const nameAddImput = document.querySelector('.popup__input_el_name-card'); //поле имени попапа места
const linkImput = document.querySelector('.popup__input_el_link-card'); //поле адреса попапа места
const buttonSubmitAddCard = document.querySelector(
  '.popup__button-submit_type_add-card'
); //сабмит попапа места

//зум-попап
const popupImage = document.querySelector('.popup_type_image');
const popupZoomImage = document.querySelector('.popup__image');
const popupHeadingImage = document.querySelector('.popup__image-heading');

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

//кнопка открытия попапа редактирования//
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDiscription.textContent;
});

// закрытие попапапов на крестик
function closePopupByCrossButton(button) {
  const popup = button.closest('.popup');
  closePopup(popup);
}
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => closePopupByCrossButton(button));
});

//закрытие на ESC
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//закрытие на Overlay
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}
document.addEventListener('click', closePopupByOverlay);

//функция редактирования формы
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDiscription.textContent = jobInput.value;
  closePopup(popupProfile);
}
formEditProfile.addEventListener('submit', handleFormSubmitProfile); //сохранить форму

//кнопка попапа добавления карточек//
buttonAddCard.addEventListener('click', function () {
  disableButton(buttonSubmitAddCard, config);
  hideInputError(formAddCard, nameAddImput, config);
  hideInputError(formAddCard, linkImput, config);
  formAddCard.reset();
  openPopup(popupAddCard);
});

//передача данных и открытие зум-попапа
function handleCardClick(name, link) {
  popupHeadingImage.textContent = name;
  popupZoomImage.src = link;
  popupZoomImage.alt = name;
  openPopup(popupImage);
}

//функция создания экземпляра карточки
function createCard(card) {
  const cardItem = new Card(card, '#cardTemplate', handleCardClick);
  return cardItem.generateCard();
}

//рендер добавления карточки
function renderCard(card) {
  elementsContainer.prepend(createCard(card));
}

//перебор всего массива
cards.forEach((card) => {
  renderCard(card);
});

//создание карточки через форму
function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = nameAddImput.value;
  const link = linkImput.value;
  const card = {
    name: name,
    link: link,
  };
  renderCard(card);
  form.reset();
  closePopup(popupAddCard);
}
formAddCard.addEventListener('submit', handleFormSubmitAdd);

// //создание карточки
// function createCard(card) {
//   const newCard = cardTemplate.cloneNode(true);
//   const cardHeading = newCard.querySelector('.element__title');

//   cardHeading.textContent = card.name;
//   const cardImage = newCard.querySelector('.element__image');
//   cardImage.setAttribute('src', card.link);
//   cardImage.setAttribute('alt', card.name);

//   cardImage.addEventListener('click', openZoomImage);

//   const deleteButton = newCard.querySelector('.element__button-delete');
//   deleteButton.addEventListener('click', deleteCardButton);

//   const likeButton = newCard.querySelector('.element__button-like');
//   likeButton.addEventListener('click', likeCard);
//   return newCard;
// }

// //функция удаления карточки
// function deleteCardButton(evt) {
//   const button = evt.target;
//   const card = button.closest('.element');
//   card.remove();
// }

// //функция лайка
// function likeCard(evt) {
//   evt.target.classList.toggle('element__button-like_active');
// }
