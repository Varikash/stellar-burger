import { getResponseData } from "../../utils/apiBackend";

export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';


export const fetchOrder = (ingredientsID) => async (dispatch) => {
  try {
  
    const response = await fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ingredients: ingredientsID,
      }),
    })

    const result = await getResponseData(response);

    dispatch({
      type: SEND_ORDER_SUCCESS,
      number: result.order.number
    })
    
  } catch (error) {
    console.log(`Произошла ошибка отправки заказа: ${error}`)
    dispatch({
      type: SEND_ORDER_FAILED,
      number: error
    })
  }
}

export const clearOrder = () => ({
    type: CLEAR_ORDER,
    number: null
})