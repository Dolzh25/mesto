export default class UserInfo {
  constructor(name, about, image) {
    this._profileName = document.querySelector(`${name}`);
    this._profileAbout = document.querySelector(`${about}`);
    this._profileAvatar = document.querySelector(`${image}`);
  }

  getUserInfo() {
    this._data = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      image: this._profileAvatar.src
    };

    return this._data;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._profileId = data._id;
    this.setUserAvatar(data);
  }
}
