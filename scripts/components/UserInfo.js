export default class UserInfo {
  constructor({ userInputName, userInputDescription }) {
    this._name = document.querySelector(userInputName);
    this._description = document.querySelector(userInputDescription);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
