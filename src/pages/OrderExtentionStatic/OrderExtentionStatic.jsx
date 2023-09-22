import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Style from './OrderExtentionStatic.module.css';
import { useEffect, useState } from "react";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

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
  const { id } = useParams();
  const ordersObj = useSelector(state => state.websocket.orders);
  const getData = state => state.ingredients.ingredients;
  const data = useSelector(getData); 
  const [order, setOrder] = useState(null);
  const [uniqueOrderArray, setUniqueOrderArray] = useState([]);
  const [sum, setSum] = useState(0);
  const price = [];

  useEffect(() => {
    if (ordersObj && Array.isArray(ordersObj.orders)) {
      const foundOrder = ordersObj.orders.find(order => order._id === id);
      setOrder(foundOrder);
    }
  }, [ordersObj, id]);

  useEffect(() => {
    if (order && data) {
      const orderArray = [];
      order.ingredients.forEach(ingredient => {
        const foundObject = data.find(obj => obj._id === ingredient);
  
        if (foundObject) {
          price.push(foundObject.price);
          orderArray.push({
            _id: foundObject._id,
            name: foundObject.name,
            price: foundObject.price,
            image: foundObject.image,
          });
        }
      });
      setSum(price?.reduce((acc, current) => acc + current, 0));
      setUniqueOrderArray(transformIngredients(orderArray));
    }
  }, [order, data, price]);

  const status = order?.status === 'done' ? 'Выполнен': 'Выполняется';
  const time = <FormattedDate date={new Date(order?.createdAt)} />;


  return(
    <div className={`${Style.container}`}>
      
    </div>
  )
}

export default OrderExtentionStatic;