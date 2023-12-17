import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/orderFeed";

import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './actions'

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
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


