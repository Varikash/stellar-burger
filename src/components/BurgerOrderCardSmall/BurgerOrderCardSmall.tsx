import Style from './BurgerOrderCardSmall.module.css';
import BurgerOrderCardImage from '../BurgerOrderCardImage/BurgerOrderCardImage';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import TIngredientProps from '../../utils/TIngredientProps.types';

type TBurgerOrderCardSmallProps = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

const BurgerOrderCardSmall = ({ element }: {element: TBurgerOrderCardSmallProps}): JSX.Element => {

  const location = useLocation();

  const getData = (state: any) => state.ingredients.ingredients; // TO BE DONE!
  const data = useSelector(getData); //TO BE DONE!
  const itemID = element._id;

  const pics: Array<string> = [];
  const price: Array<number> = [];

  element.ingredients.forEach(ingredient => {
    const foundObject: TIngredientProps | undefined = data.find((obj: TIngredientProps) => obj._id === ingredient); //DOUBLE CHECK LATER!
    
    if (foundObject) {
      pics.push(foundObject.image);
      price.push(foundObject.price);
    }
  })

  const sum = price.reduce((acc, current) => acc + current, 0);
  
  const getPicsToShow = (array: string[]) => {
    if (array.length > 5) {
      return array.slice(0, 5);
    }
    return array
  }

  const picsToShow = getPicsToShow(pics);
  const count = picsToShow.length < 5 ? null : `+${pics.length - picsToShow.length}`;
  const lastPic = pics.length >= 5 ? pics[6] : null;

  const time = <FormattedDate date={new Date(element.createdAt)} />
  
  return (
    <Link
      key={element._id}
      to={`/feed/${itemID}`}
      state={{background: location}}
      className={Style.link}
      >
    <li className={`${Style.cardList}`}>
      <ul className={`${Style.card}`}>
        <div className={`${Style.orderDetails}`}>
          <p className={`${Style.orderNumber} text text_type_digits-default`}>#{element.number}</p>
          <p className='text text_type_main-default text_color_inactive'>{time}</p>
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
            <CurrencyIcon type='primary'/>
          </div>
        </div>
      </ul>
    </li>
    </Link>
  )

}

export default BurgerOrderCardSmall;