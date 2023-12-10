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

// Эндпоинт // POST <https://norma.nomoreparties.space/api/orders>
// Тело запроса {  "ingredients": ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"] }
// Пример ответа {   "name": "Краторный метеоритный бургер",   "order": {       "number": 6257   },   "success": true }

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
