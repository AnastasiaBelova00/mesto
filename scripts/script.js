const popup = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__button-edit");
const closePopupButton = document.querySelector(".popup__button-exit");
const profileName = document.querySelector(".profile__name");
const profileDiscription = document.querySelector(".profile__discription");
const editForm = document.querySelector(".popup__container");

let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_discription");

editProfileButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDiscription.textContent;
});

closePopupButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDiscription.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

editForm.addEventListener("submit", handleFormSubmit);
