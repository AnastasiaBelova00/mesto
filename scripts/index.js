const popup = document.querySelector('.popup'); //попап//
const popupProfile = document.querySelector('.popup_type_profile'); //попап профиля//
const editProfileButton = document.querySelector('.profile__button-edit'); //кнопка редактирования профиля//
const closePopupButton = document.querySelector('.popup__button-exit'); //кнопки закрытия попапа//
const profileName = document.querySelector('.profile__name'); //имя профиля//
const profileDiscription = document.querySelector('.profile__discription'); //описание профиля//
const editForm = document.querySelector('.popup__container'); //форма редактирования попапа//
let nameInput = document.querySelector('.popup__input_el_name'); //редактирование имени//
let jobInput = document.querySelector('.popup__input_el_discription'); //редактирование описания//

//попап добавления карточек
const addCardButton = document.querySelector('.profile__button-add'); //кнопка добавления карточки//
const popupAddCard = document.querySelector('.popup_type_add-card'); //попап добавления карточек//

function openPopup(popup) {
  popup.classList.add('popup_opened'); //функция открытия попапа//
}

function closePopup(popup) {
  popup.classList.remove('popup_opened'); //функция закрытия попапа//
}

editProfileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDiscription.textContent; //кнопка открытия попапа редактирования//
});

closePopupButton.addEventListener('click', function () {
  closePopup(popupProfile);
}); //кнопка закрытия 1 попапа//

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDiscription.textContent = jobInput.value; //функция редактирования формы///
  closePopup(popup);
}
editForm.addEventListener('submit', handleFormSubmit); //сохранить форму//

addCardButton.addEventListener('click', function () {
  openPopup(popupAddCard); //кнопка попапа добавления карточек//
});
