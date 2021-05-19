export default class UserInfo {
  constructor({name, about}) {
    this._profileName = document.querySelector(`.${name}`);
    this._profileAbout = document.querySelector(`.${about}`);
  }

  getUserInfo() {
    this._data = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    };

    return this._data;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
  }
}
