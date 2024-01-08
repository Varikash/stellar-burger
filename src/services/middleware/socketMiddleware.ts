import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";
import { WebSockeOrders } from "../webSocket/websocketReducer";

type WsActions = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsOpen: ActionCreatorWithoutPayload;
    wsClose: ActionCreatorWithoutPayload;
    wsError: ActionCreatorWithPayload<string>;
    wsMessage: ActionCreatorWithPayload<WebSockeOrders>;
    wsConnecting: ActionCreatorWithoutPayload;
    wsDisconnect: ActionCreatorWithoutPayload;
};



export const socketMiddleware = (wsActions: WsActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsOpen,
        wsClose,
        wsError,
        wsMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect.type) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = event => {
          dispatch(wsError('Error'));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(wsMessage(parsedData));
        };

        socket.onclose = event => {
          dispatch(wsClose());
        };

        if (wsDisconnect.type === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
