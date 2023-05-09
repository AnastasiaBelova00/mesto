export default class UserInfo {
  constructor({ selectorUserName, selectorUserAbout, selectorUserAvatar }) {
    this._name = document.querySelector(selectorUserName);
    this._about = document.querySelector(selectorUserAbout);
    this._avatar = document.querySelector(selectorUserAvatar);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
