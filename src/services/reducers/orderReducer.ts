import { 
  SEND_ORDER_SUCCESS, 
  SEND_ORDER_FAILED,
  CLEAR_ORDER, 
} from "../actions/fetchOrder";
import { OrderActions } from "../actions/fetchOrder";

type InitialState = {
  number: number | null;
}

const initialState: InitialState = {
  number: null
}

export const orderReducer = (state = initialState, action: OrderActions) => {
  switch(action.type) {
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number
      }
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
      }
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        number: null,
      }
    }
      default: {
        return state
      }
  }
}
