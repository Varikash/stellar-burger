
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from './Card.module.css';

function Card(props) {
  const { item } = props;

  return(
    <li className={Style.card}>
      <img src={item.image} alt={item.name} className={Style.image}/>
      <div className={Style.priceBlock}>
        <span className="text text_type_digits-default">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${Style.text} text text_type_main-default`}>{item.name}</p>
    </li>
  )
}

export default Card
