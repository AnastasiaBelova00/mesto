const popup = document.querySelector('.popup'); //попап
const popups = document.querySelectorAll('.popup'); //все попапы
const popupProfile = document.querySelector('.popup_type_profile'); //попап профиля
const editProfileButton = document.querySelector('.profile__button-edit'); //кнопка редактирования профиля
const closePopupButton = document.querySelectorAll('.popup__button-exit'); //кнопки закрытия попапа
const profileName = document.querySelector('.profile__name'); //имя профиля
const profileDiscription = document.querySelector('.profile__discription'); //описание профиля
const editForm = document.querySelector('.popup__container'); //форма редактирования попапа
let nameInput = document.querySelector('.popup__input_el_name'); //редактирование имени
let jobInput = document.querySelector('.popup__input_el_discription'); //редактирование описания

//попап добавления карточек
const addCardButton = document.querySelector('.profile__button-add'); //кнопка добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card'); //попап добавления карточек
let nameAddCardInput = document.querySelector('.popup__input_el_name-card'); //редактирование названия карточки
let linkAddCardInput = document.querySelector('.popup__input_el_link-card'); //редактирование

//карточки
const elements = document.querySelector('.elements');

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//кнопка открытия попапа редактирования//
editProfileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDiscription.textContent;
});

// кнопка закрытия попапапов
closePopupButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//функция редактирования формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDiscription.textContent = jobInput.value;
  closePopup(popup);
}
editForm.addEventListener('submit', handleFormSubmit); //сохранить форму

//кнопка попапа добавления карточек//
addCardButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Изображение гор Архыза',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Изображение озера в Челябинской области',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Изображение многоэтажных домов',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Изображение гор Камчатки',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Изображение железной дороги и леса',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Изображение скалы и Байкала',
  },
];

//создание карточки
function createCard(card) {
  const newCard = document
    .querySelector('.card-template')
    .content.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__title');
  cardHeading.textContent = card.name;
  const cardImage = newCard.querySelector('.element__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.alt);
  const deleteButton = newCard.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', deleteCardButton);
  const likeButton = newCard.querySelector('.element__button-like');
  likeButton.addEventListener('click', likeCard);
  elements.prepend(newCard);
}

//перебор всех карточек и вывод на страницу
cards.forEach(createCard);

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

// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDiscription.textContent = jobInput.value;
//   closePopup(popup);
// }
