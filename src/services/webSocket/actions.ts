import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<'FEED_CONNECT'>('FEED_CONNECT');
export const disconnect = createAction<'FEED_DISCONNECT'>('FEED_DISCONNECT');
export const wsConnecting = createAction<'FEED_WS_CONNECTING'>('FEED_WS_CONNECTING');
export const wsOpen = createAction<'FEED_WS_OPEN'>('FEED_WS_OPEN');
export const wsClose = createAction<'FEED_WS_CLOSE'>('FEED_WS_CLOSE');
export const wsMessage = createAction<'FEED_WS_MESSAGE'>('FEED_WS_MESSAGE');
export const wsError = createAction<'FEED_WS_ERROR'>('FEED_WS_ERROR');
