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
}
