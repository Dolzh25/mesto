export default class Api {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {headers: this.headers})
      .then((res) => {
        if (res.ok) {
          return  res.json();
        }
      })
  }

  getProfileInfo() {
    return fetch(`${this.url}/users/me`, {headers: this.headers})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
  }

  setProfileInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
  }

  addNewCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
  }

  removeCard(data) {
    return fetch(`${this.url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
  }

  pushLike(id, method) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: method,
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
  }

  changeAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
  }
}
