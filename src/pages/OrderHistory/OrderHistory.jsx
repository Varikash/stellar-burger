import Style from './OrderHistory.module.css'
import BurgerOrderCard from '../../components/BurgerOrderCard/BurgerOrderCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  connect as connectFeedOrder,
  disconnect as disconnectFeedOrder
} from '../../services/webSocket/actions';
import { useEffect } from 'react';

const OrderHistory = () => {

  const dispatch = useDispatch();
  const orders = useSelector(state => state.websocket.orders);

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


  let ordersArray = [...orders.orders].reverse();

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