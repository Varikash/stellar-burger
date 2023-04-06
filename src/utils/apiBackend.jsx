const getResponseData = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка ${res.status} ${res.ok}`);
};

export const apiFetch = (ingredients) => {
  return fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
    .then((res) => getResponseData(res))
};