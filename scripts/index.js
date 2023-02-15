const popup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__button-edit");
const closePopupButton = document.querySelector(".popup__button-exit");
const profileName = document.querySelector(".profile__name");
const profileDiscription = document.querySelector(".profile__discription");
const editForm = document.querySelector(".popup__container");

let nameInput = document.querySelector(".popup__input_el_name");
let jobInput = document.querySelector(".popup__input_el_discription");

function closePopup() {
  popup.classList.remove("popup_opened");
}

editProfileButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDiscription.textContent;
});

closePopupButton.addEventListener("click", function () {
  closePopup();
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDiscription.textContent = jobInput.value;
  closePopup();
}

editForm.addEventListener("submit", handleFormSubmit);
