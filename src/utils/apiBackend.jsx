const getResponseData = (res) => {
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