import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

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
const profileDiscription = document.querySelector('.profile__discription'); //описание профиля
const formEditProfile = document.forms['editForm']; //форма редактирования попапа
const nameInput = document.querySelector('.popup__input_el_name'); //редактирование имени
const jobInput = document.querySelector('.popup__input_el_discription'); //редактирование описания

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

// //зум-попап
// const popupImage = document.querySelector('.popup_type_image');
// const popupZoomImage = document.querySelector('.popup__image');
// const popupHeadingImage = document.querySelector('.popup__image-heading');

// //универсальная функция открытия попапа
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEsc);
// }

// //универсальная функция закрытия попапа
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
// }

// //кнопка открытия попапа редактирования//
// buttonEditProfile.addEventListener('click', function () {
//   openPopup(popupProfile);
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileDiscription.textContent;
// });

// //закрытие на ESC
// function closePopupByEsc(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// //универсальное закрытие на крестик и Overlay всех попапов
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains('popup__close')) {
//       closePopup(popup);
//     }
//   });
// });

// //функция редактирования формы
// function handleFormSubmitProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDiscription.textContent = jobInput.value;
//   closePopup(popupProfile);
// }
// formEditProfile.addEventListener('submit', handleFormSubmitProfile); //сохранить форму

// //передача данных и открытие зум-попапа
// function handleCardClick(name, link) {
//   popupHeadingImage.textContent = name;
//   popupZoomImage.src = link;
//   popupZoomImage.alt = name;
//   openPopup(popupImage);
// }

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

//кнопка попапа добавления карточек//
buttonAddCard.addEventListener('click', function () {
  cardFormValidator.resetValidation();
  popupAddCard.openPopup();
});

// const popupEditProfile = new PopupWithForm('.popup_type_profile');
// popupEditProfile.setEventListeners();

// //функция создания экземпляра карточки
// function createCard(card) {
//   const cardItem = new Card(card, '.card-template', handleCardClick);
//   return cardItem.generateCard();
// }

// //рендер добавления карточки
// function renderCard(card) {
//   elementsContainer.prepend(createCard(card));
// }

// //перебор всего массива
// cards.forEach(renderCard);

// //создание карточки через форму
// // function handleFormSubmitAdd(evt) {
//   evt.preventDefault();
//   const form = evt.target;
//   const name = nameAddImput.value;
//   const link = linkImput.value;
//   const card = {
//     name: name,
//     link: link,
//   };
//   renderCard(card);
//   form.reset();
//   closePopup(popupAddCard);
// }
// formAddCard.addEventListener('submit', handleFormSubmitAdd);

//валидация
const profileFormValidator = new FormValidator(formEditProfile, config);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(formAddCard, config);
cardFormValidator.enableValidation();
