import { useParams } from "react-router-dom";
import Style from './OrderExtention.module.css';
import { useEffect, useState } from "react";
import { CurrencyIcon, FormattedDate, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../utils/AppThunk.types";
import TOrderHistory from "../../utils/TOrderHistory.types";

type Ingredients = {
  _id: string;
  name: string;
  price: number;
  image: string;
}

type OrderExtentionProps = {
  onClose: () => void;
}

const transformIngredients = (ingredients: Ingredients[]) => {
  const uniqueIngredients: Record<string, Ingredients & {count: number}> = {};
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

const OrderExtention = ({onClose}: OrderExtentionProps): JSX.Element => {
  const { id } = useParams();
  const ordersObj = useAppSelector(state => state.websocket.orders);
  const getData = (state: RootState) => state.ingredients.ingredients;
  const data = useAppSelector(getData); 
  const [order, setOrder] = useState<TOrderHistory | null | undefined>(null);
  const [uniqueOrderArray, setUniqueOrderArray] = useState<(Ingredients & { count: number })[]>([]);
  const [sum, setSum] = useState(0);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  }

  useEffect(() => {
    if (ordersObj && Array.isArray(ordersObj.orders)) {
      const foundOrder = ordersObj.orders.find(order => order._id === id);
      setOrder(foundOrder);
    }
  }, [ordersObj, id]);

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
      }).filter(Boolean) as Ingredients[]; // фильтрация, чтобы убрать возможные null значения
      
      const sum = orderArray.reduce((acc, cur) => acc + (cur?.price || 0), 0);
      setSum(sum);
      
      setUniqueOrderArray(transformIngredients(orderArray));
    }
}, [order, data]);


  const status = order?.status === 'done' ? 'Выполнен': 'Выполняется';
  const time = order?.createdAt? <FormattedDate date={new Date(order?.createdAt)} /> : null;
  

  return(
    <div className={`${Style.container} p-4`}>
      
      <div className={`${Style.info}`}>
        <div className={`${Style.headerContainer}`}>
          <span className={`${Style.number} text text_type_digits-default mb-10`}>#{order?.number}</span>
          <button className={`${Style.button}`} onClick={handleClick}>
            <CloseIcon type="primary"/>
          </button>
        </div>
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
          <span className={`${Style.totalSum} text text_type_digits-default`}>{sum} <CurrencyIcon type="primary"/></span>
        </div>
      </div>
    </div>
  )
}

export default OrderExtention;