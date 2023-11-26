class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка:.....`);
    }
    return res.json();
}

  getingredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
    })
    .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
});

export default api;

