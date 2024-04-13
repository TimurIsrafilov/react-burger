import {
  TypeIngredienData,
  TypeLiveOrdersData,
  TypeOrderData,
  TypeServerReply,
  TypeUserData,
  TypeUserInfo,
} from "../types/types";

type TypeApiData = {
  baseUrl: string;
};

type TypePasswordResetData = {
  password: string;
  code: string;
};

class Api {
  _baseUrl: string;

  constructor({ baseUrl }: TypeApiData) {
    this._baseUrl = baseUrl;
    // this._headers = headers;
  }

  _getResponseData<T>(res: Response): Promise<T> {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  // Получить ингредиенты можно, обратившись к нашему API:
  // https://norma.nomoreparties.space/api/ingredients

  getIngredients(): Promise<TypeIngredienData> {
    return fetch(`${this._baseUrl}/ingredients`, {}).then(
      this._getResponseData<TypeIngredienData>
    );
  }

  // GET https://norma.nomoreparties.space/api/orders/{номер заказа}
  getOrderByNumber(
    orderNumber: string | undefined
  ): Promise<TypeLiveOrdersData> {
    return fetch(`${this._baseUrl}/orders/${orderNumber}`, {}).then(
      this._getResponseData<TypeLiveOrdersData>
    );
  }

  getOrderNumber(ingredientIds: Array<string>): Promise<TypeOrderData> {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        ingredients: ingredientIds,
      }),
    }).then(this._getResponseData<TypeOrderData>);
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

  register({ email, name, password }: TypeUserInfo): Promise<TypeUserData> {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then(this._getResponseData<TypeUserData>);
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

  login({
    email,
    password,
  }: Pick<TypeUserInfo, "email" | "password">): Promise<TypeUserData> {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._getResponseData<TypeUserData>);
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

  logout(): Promise<Pick<TypeServerReply, "success" | "message">> {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(
      this._getResponseData<Pick<TypeServerReply, "success" | "message">>
    );
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

  passwordForgot({
    email,
  }: Pick<TypeUserInfo, "email">): Promise<
    Pick<TypeServerReply, "success" | "message">
  > {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then(
      this._getResponseData<Pick<TypeServerReply, "success" | "message">>
    );
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

  passwordReset({
    password,
    code,
  }: TypePasswordResetData): Promise<
    Pick<TypeServerReply, "success" | "message">
  > {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: code,
      }),
    }).then(
      this._getResponseData<Pick<TypeServerReply, "success" | "message">>
    );
  }

  // GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
  // Для получения данных о пользователе необходимо передать серверу токен из куков в поле authorization.
  // Сервер вернёт такой ответ:
  // {
  //   "success": true,
  //   "user": {
  //     "email": "",
  //     "name": ""
  //   }
  // }

  getUser(): Promise<Pick<TypeUserData, "success" | "user">> {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("accessToken")}`,
      },
    }).then((res: Response) => {
      return res.ok
        ? res.json()
        : fetchWithRefresh(`${this._baseUrl}/auth/user`, {
            headers: {
              "Content-Type": "application/json",
              authorization: `${localStorage.getItem("refreshToken")}`,
            },
          });
    });
  }

  // PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.
  // Если пользователь отредактирует информацию на экране профиля и нажмёт «Сохранить», то серверу также
  // потребуется поле authorization и поля с отредактированной информацией.
  // Если всё хорошо — сервер вернёт обновлённого пользователя:
  // {
  //   "success": true,
  //   "user": {
  //     "email": "",
  //     "name": ""
  //   }
  // }

  changeUserData({
    email,
    name,
    password,
  }: TypeUserInfo): Promise<Pick<TypeUserData, "success" | "user">> {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then(this._getResponseData<Pick<TypeUserData, "success" | "user">>);
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

const checkReponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = (): Promise<
  Pick<TypeUserData, "success" | "accessToken" | "refreshToken">
> => {
  return fetch("https://norma.nomoreparties.space/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(
    checkReponse<Pick<TypeUserData, "success" | "accessToken" | "refreshToken">>
  );
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkReponse<T>(res);
  } catch (err: unknown) {
    if (err) {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);

      const headersInit: HeadersInit = {};
      options.headers = headersInit;
      options.headers.authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      return await checkReponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
