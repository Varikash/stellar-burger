import { 
  SEND_ORDER, 
  SEND_ORDER_SUCCESS, 
  SEND_ORDER_FAILED,
  CLEAR_ORDER, 
} from "../actions/fetchOrder";

const initialState = {
  pushOrder: false,
  errorPushOrder: null,
  data: null
}

export const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEND_ORDER: {
      return {
        ...state,
        pushOrder: true,
        errorPushOrder: false,
      }
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        pushOrder: false,
        errorPushOrder: false,
        data: action.orders
      }
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        pushOrder: false,
        errorPushOrder: action.error
      }
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        pushOrder: false,
        errorPushOrder: null,
        data: null
      }
    }

      default: {
        return state
      }
  }
}
