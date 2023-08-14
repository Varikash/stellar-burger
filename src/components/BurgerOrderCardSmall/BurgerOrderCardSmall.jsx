import Style from './BurgerOrderCardSmall.module.css';
import moment from 'moment';
import BurgerOrderCardImage from '../BurgerOrderCardImage/BurgerOrderCardImage';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const BurgerOrderCardSmall = () => {

  const currentDate = moment().format('DD.MM.YYYY, HH:mm [i-GTM+3]')
  const getData = state => state.ingredients.ingredients;
  const data = useSelector(getData);




  const pics = []; //delete after

  data.forEach(element => pics.push(element.image)); //delete after

  const getPicsToShow = (array) => {
    if (array.length > 5) {
      return array.slice(0, 5);
    }
    return array
  }

  const picsToShow = getPicsToShow(pics);
  // console.log(picsToShow);

  const count = picsToShow.length < 5? null : `+${pics.length - picsToShow.length}`;
  // console.log(count);

  const lastPic = pics.length >= 5 ? pics[6] : null;
  // console.log(lastPic);
  
  // console.log(pics.length);
  // console.log(pics)

  return (
    <li className={`${Style.cardList}`}>
      <ul className={`${Style.card}`}>
        <div className={`${Style.orderDetails}`}>
          <p className={`${Style.orderNumber} text text_type_digits-default`}>#034535</p>
          <p className='text text_type_main-default text_color_inactive'>{currentDate}</p>
        </div>
        <div className={`${Style.orderInfo}`}>
          <p className={`${Style.orderTitle} text text_type_main-medium`}>
            Death Star Starship Main бургер
          </p>
        </div>
        <div className={`${Style.orderContent}`}>
          <BurgerOrderCardImage picsUrl={picsToShow} lastPicture={lastPic} count={count} />
          <div className={`${Style.priceBox}`}>
            <p className={`${Style.orderPrice}`}>480</p>
            <CurrencyIcon/>
          </div>
        </div>
      </ul>
    </li>
  )

}

export default BurgerOrderCardSmall;