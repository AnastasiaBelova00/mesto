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
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document
  .querySelector('.card-template')
  .content.querySelector('.element');
const nameAddImput = document.querySelector('.popup__input_el_name-card');
const linkImput = document.querySelector('.popup__input_el_link-card');

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//кнопка открытия попапа редактирования//
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDiscription.textContent;
});

// кнопка закрытия попапапов
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

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
  openPopup(popupAddCard);
});

//создание карточки
function createCard(card) {
  const newCard = cardTemplate.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__title');
  cardHeading.textContent = card.name;
  const cardImage = newCard.querySelector('.element__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.alt);
  cardImage.addEventListener('click', openZoomImage);
  const deleteButton = newCard.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', deleteCardButton);
  const likeButton = newCard.querySelector('.element__button-like');
  likeButton.addEventListener('click', likeCard);
  elementsContainer.prepend(newCard);
}

//перебор всех карточек и вывод на страницу
cards.forEach(createCard);

// function addCard(name, link) {
//   const cardElement = createCard(name, link);
//   elementsContainer.prepend(cardElement);
// }

//функция удаления карточки
function deleteCardButton(evt) {
  const button = evt.target;
  const card = button.closest('.element');
  card.remove();
}

//функция лайка
function likeCard(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

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
  createCard(card);
  closePopup(popupAddCard);
  form.reset();
}
formAddCard.addEventListener('submit', handleFormSubmitAdd);

//зум-попап
const popupImage = document.querySelector('.popup_type_image');
const popupZoomImage = document.querySelector('.popup__image');
const popupHeadingImage = document.querySelector('.popup__image-heading');
// const cardImage = document.querySelector('.element__image');

//передача данных и открытие
function openZoomImage(evt) {
  popupHeadingImage.textContent = evt.target.alt;
  popupZoomImage.src = evt.target.src;
  openPopup(popupImage);
}

// //кнопки на все изображения
// cardImage.forEach((button) => {
//   button.addEventListener('click', openZoomImage);
// });

// //открытие всех изображений карточек
// cardImage.forEach(openZoomImage);
