export const WebsocketStatus = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
} as const;

export type SocketStatus = typeof WebsocketStatus[keyof typeof WebsocketStatus];