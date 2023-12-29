import Style from './OrderHistory.module.css'
import BurgerOrderCard from '../../components/BurgerOrderCard/BurgerOrderCard';
import {
  connect as connectFeedOrder,
  disconnect as disconnectFeedOrder
} from '../../services/webSocket/actions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const OrderHistory = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.websocket.orders);

  const userOrderURL = 'wss://norma.nomoreparties.space/orders';
  const token = localStorage.getItem('accessToken');
  const pureToken = token ? token.replace('Bearer ', '') : '';
  const WS_USER_FEED_ORDER_URL = `${userOrderURL}?token=${pureToken}`;



  const connect = () => dispatch(connectFeedOrder(WS_USER_FEED_ORDER_URL));
  const disconnect = () => dispatch(disconnectFeedOrder());



  useEffect(() => {
    connect();
    return () => {
      disconnect();
    }
  }, [])


  let ordersArray = orders?.orders? [...orders.orders].reverse() : [];

  return (
    <div className={`${Style.page}`}>
      {ordersArray && 
        ordersArray.map(element => {
          return <BurgerOrderCard key={element._id} element={element} />
        })
      }
    </div>
    
  )
}

export default OrderHistory;