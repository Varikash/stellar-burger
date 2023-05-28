export const getResponseData = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка ${res.status} ${res.ok}`);
};

export const getOrders = (ingredients) => {
  return fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
    .then((res) => getResponseData(res))
};


export const getIngredients = () => {
  return fetch('https://norma.nomoreparties.space/api/ingredients')
  .then((res) => getResponseData(res))
}

export const sendEmail = async (data) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/password-reset', 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data
      }),
    })

    if (!response.ok) {
      throw new Error(`Ошибка при отправке запроса на сервер`)
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.log(error);
    throw new Error(`Ошибка при отправке запроса на сервер`)
  }
}

export const registerUser = async (form) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/register',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      }
    )
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server response', errorData);
      throw new Error(`Ошибка ${response.status}: ${errorData.message}`);
    }

    const result = await response.json();
    return result;

    } catch (error) {
      console.log(error);
      throw new Error(error.message)
    }
}

export const logginUser = async (form) => {
  try{
    const response = await fetch('https://norma.nomoreparties.space/api/auth/login',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      }
    )
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server response', errorData);
      throw new Error(`Ошибка ${response.status}: ${errorData.message}`);
    }

    const result = await response.json();
    return result;

  }
  catch (error) {
    throw new Error(error.message);
  }
}

export const fetchUser = async (token) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/user',
    {
      method: 'GET',
      headers: {
        authorization: token,
      },
    }
  )

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Ошибка ${response.status}: ${errorData.message}`);
  }

  const result = await response.json();
  return result;

  } catch (error) {
    throw new Error(error.message);
  }
}

export const refreshUser = async (token) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/token', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: token,
      }),
    }
  )

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Ошибка ${response.status}: ${errorData.message}`);
  }

  const result = await response.json();
  return result;


  } catch (error) {
    throw new Error(error.message);
  }
}

export const updateUser = async (token, form) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/user',
      {
        method: 'PATCH',
        headers: {
          authorization: token,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      }
    )

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка ${response.status}: ${errorData.message}`)
    }

    const result = await response.json();
    return result;

  } catch (error) {
    throw new Error(error.message);
  }
}

export const logOut = async (refreshToken) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/logout', 
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка ${response.status}: ${errorData.message}`);
    }

  } catch (error) {
    throw new Error(error.message);
  }
}

export const sendNewPass = async (form) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/password-reset/reset',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      }
    )

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка ${response.status}: ${errorData.message}`);
    }
    
  } catch (error) {
    throw new Error(error.message);
  }
}