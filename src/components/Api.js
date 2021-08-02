export default class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {headers: this.headers})
      .then(this._checkResault)
  }

  getProfileInfo() {
    return fetch(`${this.url}/users/me`, {headers: this.headers})
      .then(this._checkResault)
  }

  setProfileInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResault)
  }

  addNewCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResault)
  }

  removeCard(data) {
    return fetch(`${this.url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResault)
  }

  pushLike(id, method) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: method,
      headers: this.headers,
    })
      .then(this._checkResault)
      .catch((err) => {
        console.log(err);
      })
  }

  changeAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResault)
  }

  _checkResault(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
