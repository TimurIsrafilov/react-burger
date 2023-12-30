class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    // this._headers = headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  getingredients() {
    return fetch(`${this._baseUrl}/ingredients`, {}).then(
      this._getResponseData
    );
  }

  getOrderNumber(ingredientIds) {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientIds,
      }),
    }).then(this._getResponseData);
  }

  // Для реализации этой функциональности потребуется создать пользователя.
  // Вы можете сделать это, отправив POST запрос к эндпоинту
  // https://norma.nomoreparties.space/api/auth/register
  // Пример тела запроса:
  // {
  //   "email": "",
  //   "password": "",
  //   "name": ""
  // }
  // Тело ответа сервера при успешной регистрации:
  // {
  //   "success": true,
  //   "user": {
  //     "email": "",
  //     "name": ""
  //   },
  //   "accessToken": "Bearer ...",
  //   "refreshToken": ""
  // }

  register(userData) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      }),
    }).then(this._getResponseData);
  }

  // POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
  // Формат тела запроса авторизации:
  // {
  //   "email": "",
  //   "password": ""
  // }
  // Тело ответа сервера при успешной авторизации:
  // {
  //   "success": true,
  //   "accessToken": "Bearer ...",
  //   "refreshToken": "",
  //   "user": {
  //     "email": "",
  //     "name": ""
  //   }
  // }

  login(userData) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then(this._getResponseData);
  }

  // Для выхода из системы или обновления токена используется именно refreshToken,
  // который можно получить после успешной регистрации или авторизации.
  // POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
  // Для выхода из системы передайте в теле запроса значение refreshToken:
  // {
  //   "token": "значение refreshToken"
  // }
  // Тело ответа сервера при выходе из системы:
  // {
  //   "success": true,
  //   "message": "Successful logout"
  // }

  logout() {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(this._getResponseData);
  }

  // На экране /forgot-password пользователь вводит адрес электронной почты и нажимает
  // кнопку «Восстановить». После этого происходит POST запрос к эндпоинту
  // https://norma.nomoreparties.space/api/password-reset
  // Тело запроса:
  // {
  //   "email": ""
  // }
  // Тело успешного ответа:
  // {
  //   "success": true,
  //   "message": "Reset email sent"
  // }

  passwordForgot(data) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    })
      .then(this._getResponseData)
      .catch((error) => {
        if (error.message === "jwt expired") {
          fetchWithRefresh(`${this._baseUrl}/auth/user`, {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("refreshToken"),
            },
          });
        }
      });
  }

  // На экране /reset-password пользователь вводит новый пароль и код из имейла,
  // а после нажимает кнопку «Сохранить». После этого происходит POST запрос к эндпоинту
  // https://norma.nomoreparties.space/api/password-reset/reset
  // Тело запроса:
  // {
  //   "password": "",
  //   "token": ""
  // }
  // Тело успешного ответа:
  // {
  //   "success": true,
  //   "message": "Password successfully reset"
  // }

  passwordReset(data) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
        token: data.code,
      }),
    }).then(this._getResponseData);
  }

  // GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
  // Для получения данных о пользователе необходимо передать серверу токен из куков в поле authorization. Сервер вернёт такой ответ:
  // {
  //   "success": true,
  //   "user": {
  //     "email": "",
  //     "name": ""
  //   }
  // }

  getUser() {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then(this._getResponseData)
      .catch((error) => {
        // if (error.message === "jwt expired") {
        if (error) {
          fetchWithRefresh(`${this._baseUrl}/auth/user`, {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("refreshToken"),
            },
          });
        }
      });
  }

  // PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.
  // Если пользователь отредактирует информацию на экране профиля и нажмёт «Сохранить», то серверу также потребуется
  // поле authorization и поля с отредактированной информацией. Если всё хорошо — сервер вернёт обновлённого пользователя:
  // {
  //   "success": true,
  //   "user": {
  //     "email": "",
  //     "name": ""
  //   }
  // }

  updateUser(userData) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
  // headers: {
  //   "Content-Type": "application/json",
  //   authorization: localStorage.getItem("accessToken"),
  //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  // },
});

export default api;

// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.
// Для обновления токена передайте в теле запроса значение refreshToken:
// {
//   "token": "значение refreshToken"
// }
// Тело ответа сервера при успешном обновлении токена:
// {
//   "success": true,
//   "accessToken": "Bearer ...",
//   "refreshToken": ""
// }

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch("https://norma.nomoreparties.space/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
