import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';

import {
  config,
  buttonEditProfile,
  formEditProfile,
  buttonAddCard,
  formAddCard,
  buttonAvatar,
  formAvatar,
} from '../scripts/utils/constants.js';

import './index.css';
import { data } from 'autoprefixer';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '9d9d46b1-d674-4200-a18f-5deb215f4e52',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([profileInfo, cardsData]) => {
    userId = profileInfo._id;
    userInfo.setUserInfo(profileInfo);
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });

//информация о пользователе
const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserAbout: '.profile__description',
  selectorUserAvatar: '.profile__image',
});

//ВАЛИДАЦИЯ
const profileFormValidator = new FormValidator(formEditProfile, config);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(formAddCard, config);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formAvatar, config);
avatarFormValidator.enableValidation();

//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
//кнопка открытия попапа редактирования//
buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.open();
  const profileInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues(profileInfo);
});

//сабмит редактирования
function handleFormSubmitEdit(data) {
  popupEditProfile.renderLoading(true);
  api
    .editUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
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
  popupAvatar.renderLoading(true);
  api
    .changeUserAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
}

//попап редактирования аватара
const popupAvatar = new PopupWithForm(
  '.popup_type_avatar',
  handleFormSubmitAvatar
);
popupAvatar.setEventListeners();

//кнопка открытия попапа аватара
buttonAvatar.addEventListener('click', function () {
  avatarFormValidator.resetValidation();
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
    handleLikeClick,
    handleCardDelete
  );

  return newCard.generateCard();
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
  popupAddCard.renderLoading(true);
  api
    .addCard(data)
    .then((res) => {
      const card = createCard(res);
      cardList.setItem(card);
      popupAddCard.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
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

//ПОПАП УДАЛЕНИЯ
//попап удаления
const popupConfirm = new PopupWithConfirm('.popup_type_confirm');
popupConfirm.setEventListeners();

//удаление карточки
function handleCardDelete(card) {
  const submitCardDelete = () => {
    popupConfirm.renderDeleting(true);
    api
      .deleteCard(card.cardId)
      .then(() => {
        card.removeCard();
        popupConfirm.close();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => {
        popupConfirm.renderDeleting(false);
      });
  };
  popupConfirm.setSubmitAction(submitCardDelete);
  popupConfirm.open();
}
