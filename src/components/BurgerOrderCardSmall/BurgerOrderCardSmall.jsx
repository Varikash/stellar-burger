import Style from './BurgerOrderCardSmall.module.css';
import BurgerOrderCardImage from '../BurgerOrderCardImage/BurgerOrderCardImage';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const BurgerOrderCardSmall = ({ element }) => {

  const getData = state => state.ingredients.ingredients;
  const data = useSelector(getData);

  const pics = [];
  const price = [];

  element.ingredients.forEach(ingredient => {
    const foundObject = data.find(obj => obj._id === ingredient);

    if (foundObject) {
      pics.push(foundObject.image);
      price.push(foundObject.price);
    }
  })

  const sum = price.reduce((acc, current) => acc + current, 0);
  
  const getPicsToShow = (array) => {
    if (array.length > 5) {
      return array.slice(0, 5);
    }
    return array
  }

  const picsToShow = getPicsToShow(pics);
  const count = picsToShow.length < 5 ? null : `+${pics.length - picsToShow.length}`;
  const lastPic = pics.length >= 5 ? pics[6] : null;
  
  return (
    <li className={`${Style.cardList}`}>
      <ul className={`${Style.card}`}>
        <div className={`${Style.orderDetails}`}>
          <p className={`${Style.orderNumber} text text_type_digits-default`}>#{element.number}</p>
          <p className='text text_type_main-default text_color_inactive'>{element.createdAt}</p>
        </div>
        <div className={`${Style.orderInfo}`}>
          <p className={`${Style.orderTitle} text text_type_main-medium`}>
            {element && element.name}
          </p>
        </div>
        <div className={`${Style.orderContent}`}>
          <BurgerOrderCardImage picsUrl={picsToShow} lastPicture={lastPic} count={count} />
          <div className={`${Style.priceBox}`}>
            <p className={`${Style.orderPrice} text text_type_digits-default`}>{sum}</p>
            <CurrencyIcon/>
          </div>
        </div>
      </ul>
    </li>
  )

}

export default BurgerOrderCardSmall;