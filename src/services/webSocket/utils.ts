import { socketMiddleware } from "../middleware/socketMiddleware";

import {
  connect as FeedConnect,
  disconnect as FeedDisconnect,
  wsConnecting as FeedConnecting,
  wsOpen as FeedOpen,
  wsClose as FeedClose,
  wsMessage as FeedMessage,
  wsError as FeedError,
} from './actions'

export const FeedOrderMiddleware = socketMiddleware({
  wsConnect: FeedConnect,
  wsDisconnect: FeedDisconnect,
  wsConnecting: FeedConnecting,
  wsOpen: FeedOpen,
  wsClose: FeedClose,
  wsMessage: FeedMessage,
  wsError: FeedError
})