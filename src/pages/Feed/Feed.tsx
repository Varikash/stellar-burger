import { useEffect, useMemo } from 'react';
import BurgerOrderCardSmall from '../../components/BurgerOrderCardSmall/BurgerOrderCardSmall';
import Wrapper from '../../components/Wrapper/Wrapper';
import Style from './Feed.module.css';
import {
  connect as connectFeedOrder,
  disconnect as disconnectFeedOrder
} from '../../services/webSocket/actions'
import { WS_FEED_ORDER_URL } from '../../utils/url';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';


const Feed = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.websocket.orders);

  const connect = () => dispatch(connectFeedOrder(WS_FEED_ORDER_URL));
  const disconnect = () => dispatch(disconnectFeedOrder());



  useEffect(() => {
    connect();
    return () => {
      disconnect();
    }
  }, [])

  let arrayReady = useMemo(() => {
    return orders?.orders?.filter(element => element.status === 'done').map(element => element.number) || [];
  }, [orders]);

  let arrayProgress = useMemo (() => {
    return orders?.orders?.filter(element => element.status !== 'done').map(element => element.number) || [];
  }, [orders]);
  
  return (
      <Wrapper>
        <p className={`${Style.header} text text_type_main-large`}>Лента Заказов</p>
        <div className={`${Style.container}`}>
          <div className={`${Style.feedLog}`}>
            {orders?.orders && 
              orders.orders.map((element) => {
                return <BurgerOrderCardSmall key={element._id} element={element}/>
              })
            }
          </div>
          <div className={`${Style.feedData}`}>
            <div className={`${Style.feedStatus}`}>
              <div className={`${Style.feedReady}`}>
                <p className={`${Style.headerStatus} text text_type_main-large`}>Готовы:</p>
                <ul className={`${Style.list}`}>
                {arrayReady.map((element, index) => (
                  <li key={index} 
                  className={`${Style.readyList} text text_type_digits-default`}>
                    {element}
                  </li>
                ))}
                </ul>
              </div>
              <div className={`${Style.feedProcessing}`}>
                <p className={`${Style.headerStatus} text text_type_main-large`}>В работе:</p>
                <ul className={`${Style.list}`}>
                {arrayProgress.map((element, index) => (
                  <li key={index} 
                  className={`${Style.processingList} text text_type_digits-default`}>
                    {element}
                  </li>
                ))}
                </ul>
              </div>
            </div>
            <div>
              <p className={`text text_type_main-large`}>Выполненно за всё время</p>
              <p className={`${Style.number} text text_type_digits-large`}>{orders?.total}</p>
            </div>
            <div>
              <p className={`${Style.headerToday} text text_type_main-large`}>Выполненно за сегодня:</p>
              <p className={`${Style.number} text text_type_digits-large`}>{orders?.totalToday}</p>
            </div>
          </div>
        </div>
      </Wrapper>
  )
}

export default Feed;