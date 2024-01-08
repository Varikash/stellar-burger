import { AnyAction } from "redux";
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from "redux";
import { getResponseData } from "../../utils/apiBackend";
import { BASE_URL } from "../../utils/url";
import { AppThunk } from "../../utils/AppThunk.types";
import { FetchOrder } from "../../utils/ApiResponse.types";

export const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';

type SendOrderSuccessAction = {
  type: typeof SEND_ORDER_SUCCESS;
  number: number;
}

type SendOrderFailedAction = {
  type: typeof SEND_ORDER_FAILED;
  error: string;
}

type ClearOrderAction = {
  type: typeof CLEAR_ORDER;
  number: null;
}

export type OrderActions = SendOrderSuccessAction | SendOrderFailedAction | ClearOrderAction;


export const fetchOrder = (ingredientsID: Array<string>, token: string | null): AppThunk => async (dispatch: Dispatch<OrderActions>) => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        ingredients: ingredientsID,
      }),
    })

    const result: FetchOrder = await getResponseData(response);

    dispatch({
      type: SEND_ORDER_SUCCESS,
      number: result.order.number
    })
    
  } catch (error) {
    console.error(`Произошла ошибка отправки заказа: ${error}`)
    dispatch({
      type: SEND_ORDER_FAILED,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
}

export const clearOrder = () => ({
    type: CLEAR_ORDER,
    number: null
})
