import { BASE_URL } from "./url";

export const getResponseData = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка ${res.status} ${res.ok}`);
};

const request = (url, options) => {
  return fetch(url, options).then(getResponseData);
};

export const getOrders = (ingredients) => {
  return request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};


export const getIngredients = () => {
  return request(`${BASE_URL}/ingredients`);
};

export const sendEmail = (data) => {
  return request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data
    }),
  });
};

export const registerUser = (form) => {
  return request(`${BASE_URL}/auth/register`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    });
};

export const logginUser = (form) => {
  return request(`${BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    });
};

export const fetchUser = (token) => {
  return request(`${BASE_URL}/auth/user`,
    {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });
};

export const refreshUser = (token) => {
  return request(`${BASE_URL}/auth/token`, 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: token,
      }),
    });
};

export const updateUser = (token, form) => {
  return request(`${BASE_URL}/auth/user`,
    {
      method: 'PATCH',
      headers: {
        authorization: token,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(form),
    });
};

export const logOut = (refreshToken) => {
  return request(`${BASE_URL}/auth/logout`, 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
};

export const sendNewPass = (form) => {
    return request(`${BASE_URL}/password-reset/reset`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      });
};