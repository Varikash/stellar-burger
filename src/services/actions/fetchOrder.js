import { getOrders, getResponseData } from "../../utils/apiBackend";

export const SEND_ORDER = 'SEND_ORDER';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const fetchOrder = (ingredientsID) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_ORDER
    })

    const response = await getOrders(ingredientsID);
    const result = await getResponseData(response);
    dispatch({
      type: SEND_ORDER_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.log(`Произошла ошибка отправки заказа: ${error}`)
    dispatch({
      type: SEND_ORDER_FAILED,
      data: error
    })
  }
}

export const clearOrder = () => {
  dispatch({
    type: CLEAR_ORDER
  })
}