export default class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {headers: this.headers})
      .then(this._checkResault)
      .catch(this._showError)
  }

  getProfileInfo() {
    return fetch(`${this.url}/users/me`, {headers: this.headers})
      .then(this._checkResault)
      .catch(this._showError)
  }

  setProfileInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResault)
      .catch(this._showError)
  }

  addNewCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResault)
      .catch(this._showError)
  }

  removeCard(data) {
    return fetch(`${this.url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResault)
      .catch(this._showError)
  }

  pushLike(id, method) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: method,
      headers: this.headers,
    })
      .then(this._checkResault)
      .catch(this._showError)
  }

  changeAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data
      })
    })
      .then(this._checkResault)
      .catch(this._showError)
  }

  _checkResault(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _showError = (err) => {
    console.log(err);
    return Promise.reject(err);
  };
}
