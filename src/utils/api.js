class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка:.....`);
    }
    return res.json();
  }

  getingredients() {
    return fetch(`${this._baseUrl}/ingredients`, {}).then(
      this._getResponseData
    );
  }

  getOrderNumber(ingredientIds) {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        ingredients: ingredientIds,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
