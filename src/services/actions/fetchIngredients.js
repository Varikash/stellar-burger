import { getIngredients } from "../../utils/apiBackend";
export const GET_FEED = 'GET_FEED';
export const GET_FEED_FAILED = 'GET_FEED_FAILED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';

export function fetchIngredients() {

  return function(dispatch) {

    dispatch({
      type: GET_FEED
    })

      getIngredients()
      .then(data => {
        dispatch({
          type: GET_FEED_SUCCESS,
          ingredients: data.data
        });
      })
      .catch(err => {
        console.log(`Произошла ошибка запроса: ${err}`)
        dispatch({
          type: GET_FEED_FAILED
        });
      });
    }
}