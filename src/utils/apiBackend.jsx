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
      throw new Error(`Ошибка при отправке запроса на сервер при регистрации пользователя`)
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
    console.error(error);
    throw new Error(`Ошибка при отправке запроса на сервер при авторизации пользователя`)
  }
}