import { BASE_URL } from "./url";

export const getResponseData = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка ${res.status} ${res.ok}`);
};

export const getOrders = (ingredients) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
    .then(getResponseData);
};


export const getIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`)
  .then(getResponseData);
}

export const sendEmail = (data) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data
    }),
  })
  .then(getResponseData);
}

export const registerUser = (form) => {
  return fetch(`${BASE_URL}/auth/register`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    })
  .then(getResponseData);
}

export const logginUser = (form) => {
  return fetch(`${BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    }
  )
  .then(getResponseData);
}

export const fetchUser = (token) => {
  return fetch(`${BASE_URL}/auth/user`,
    {
      method: 'GET',
      headers: {
        authorization: token,
      },
    }
  )
  .then(getResponseData);
}

export const refreshUser = (token) => {
  return fetch(`${BASE_URL}/auth/token`, 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: token,
      }),
    }
  )
  .then(getResponseData);
}

export const updateUser = (token, form) => {
  return fetch(`${BASE_URL}/auth/user`,
    {
      method: 'PATCH',
      headers: {
        authorization: token,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(form),
    }
  )
  .then(getResponseData);
}

export const logOut = (refreshToken) => {
  return fetch(`${BASE_URL}/auth/logout`, 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    }
  )
  .then(getResponseData);
}

export const sendNewPass = (form) => {
    return fetch(`${BASE_URL}/password-reset/reset`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      }
    )
  .then(getResponseData);
}