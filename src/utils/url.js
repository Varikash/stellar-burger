export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const WS_FEED_ORDER_URL = 'wss://norma.nomoreparties.space/orders/all';

const userOrderURL = 'wss://norma.nomoreparties.space/orders';
const token = localStorage.getItem('accessToken');
const pureToken = token ? token.replace('Bearer ', '') : '';

export const WS_USER_FEED_ORDER_URL = `${userOrderURL}?token=${pureToken}`;