export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
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

        if (wsSendMessage && type === wsSendMessage.type) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.type === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
