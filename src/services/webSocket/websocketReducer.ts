import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus, SocketStatus } from "../../utils/orderFeed";
import TOrderHistory from "../../utils/TOrderHistory.types";
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './actions';

export type WebSockeOrders = {
  success: boolean;
  orders: TOrderHistory[];
  total: number;
  totalToday: number;
}

type WebSocketState = {
  status: SocketStatus;
  orders: WebSockeOrders | null;
  connectingError: string;
}

const initialState: WebSocketState = {
  status: WebsocketStatus.OFFLINE,
  orders: null,
  connectingError: ''
}


export const webSocketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(wsClose, state => {
      state.status = WebsocketStatus.OFFLINE
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload
    })
})


