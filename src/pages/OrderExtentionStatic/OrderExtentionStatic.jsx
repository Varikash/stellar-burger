import { useParams, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Style from './OrderExtentionStatic.module.css';
import { useEffect, useState } from "react";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  connect as connectFeedOrder,
  disconnect as disconnectFeedOrder
} from '../../services/webSocket/actions';
import { WS_FEED_ORDER_URL } from "../../utils/url";
import { WS_USER_FEED_ORDER_URL } from "../../utils/url";

const transformIngredients = (ingredients) => {
  const uniqueIngredients = {};

  ingredients?.forEach(ingredient => {
    if (uniqueIngredients[ingredient._id]) {
      uniqueIngredients[ingredient._id].count += 1;
    } else {
      uniqueIngredients[ingredient._id] = {
        ...ingredient,
        count: 1
      };
    }
  });
  return Object.values(uniqueIngredients);
}


const OrderExtentionStatic = () => {

  const isProfileOrder = useMatch('/profile/orders/:id');
  const isFeedOrder = useMatch('/feed/:id');

  const dispatch = useDispatch();

  const connect = (url) => dispatch(connectFeedOrder(url));
  const disconnect = () => dispatch(disconnectFeedOrder());

  const { id } = useParams();
  const ordersObj = useSelector(state => state.websocket.orders);
  const getData = state => state.ingredients.ingredients;
  const data = useSelector(getData); 
  const [order, setOrder] = useState(null);
  const [uniqueOrderArray, setUniqueOrderArray] = useState([]);
  const [sum, setSum] = useState(0);
  const price = [];

  useEffect(() => {
    const url = isProfileOrder? WS_USER_FEED_ORDER_URL : isFeedOrder ? WS_FEED_ORDER_URL : null;
    if (url) {
      connect(url);
    }

    return () => {
      disconnect();
    }
  }, [dispatch, isProfileOrder, isFeedOrder]);

  useEffect(() => {
    if (ordersObj && Array.isArray(ordersObj.orders)) {
      const foundOrder = ordersObj.orders.find(order => order._id === id);
      setOrder(foundOrder);
    }
  }, [ordersObj, id]);

  // useEffect(() => {
  //   if (order && data) {
  //     const orderArray = [];
  //     order.ingredients.forEach(ingredient => {
  //       const foundObject = data.find(obj => obj._id === ingredient);
  
  //       if (foundObject) {
  //         price.push(foundObject.price);
  //         orderArray.push({
  //           _id: foundObject._id,
  //           name: foundObject.name,
  //           price: foundObject.price,
  //           image: foundObject.image,
  //         });
  //       }
  //     });
  //     setSum(price?.reduce((acc, current) => acc + current, 0));
  //     setUniqueOrderArray(transformIngredients(orderArray));
  //   }
  // }, [order, data, price]);

  useEffect(() => {
    if (order && data) {
      const orderArray = order.ingredients.map(ingredient => {
        const foundObject = data.find(obj => obj._id === ingredient);
        return foundObject ? {
          _id: foundObject._id,
          name: foundObject.name,
          price: foundObject.price,
          image: foundObject.image,
        } : null;
      }).filter(Boolean); // фильтрация, чтобы убрать возможные null значения
      
      const sum = orderArray.reduce((acc, cur) => acc + (cur?.price || 0), 0);
      setSum(sum);
      
      setUniqueOrderArray(transformIngredients(orderArray));
    }
}, [order, data]);




  const status = order?.status === 'done' ? 'Выполнен': 'Выполняется';
  const time = <FormattedDate date={new Date(order?.createdAt)} />;

  return(
    <div className={`${Style.container}`}>
      <div className={`${Style.modal}`}>
        <div className={`${Style.info}`}>
        <span className={`${Style.number} text text_type_digits-default mb-10`}>#{order?.number}</span>
        <h2 className={`${Style.header} text text_type_main-medium mb-3`}>{order?.name}</h2>
        <span className={`${Style.status} text text_type_main-small mb-15`}>{status}</span>
        <span className={`text text_type_main-medium mb-6`}>Состав:</span>
        <ul className={`${Style.list} mb-10 mr-6`}>
          {uniqueOrderArray && uniqueOrderArray.map((element, index) => (
            <li key={index} className={`${Style.listElement}`}>
              <div className={`${Style.ingredientContainer}`}>
                <div className={`${Style.imageContainer} mr-4`}>
                  <img src={element.image} alt="ингредиент" className={`${Style.image}`}/>
                </div>
                <span className={`${Style.ingredientName} text text_type_main-default`}>{element.name}</span>
                <div className={`${Style.ingredientPrice} ml-4`}>
                  <span className={`text text_type_digits-default`}>{`${element.count} x ${element.price}`}</span>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            </li>
          )) }
        </ul>
        <div className={`${Style.infoOrder}`}>
          <span className={`text text_type_main-default text_color_inactive`}>{time}</span>
          <span className={`${Style.totalSum} text text_type_digits-default`}>{sum} <CurrencyIcon /></span>
        </div>
        </div>
      </div>
    </div>
  )
}

export default OrderExtentionStatic;