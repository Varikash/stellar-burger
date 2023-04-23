import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from './Card.module.css';
import PropTypesBurger from '../../utils/PropTypesShape';
import { passIngredient } from "../../services/actions/ingredientAction";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";

function Card({item}) {

  const { bunItem, ingredientsList } = useSelector(store => store.orderList);

  const counter = useMemo(() => {
    let count = 0;
    for (let { _id } of ingredientsList) {
      if (_id === item._id) {
        count++
      }
    }
    if (bunItem && bunItem._id === item._id) {
      count += 2;
    }
    return count;
  }, [bunItem, ingredientsList, item._id])
  

  const [{opacity}, dragRef] = useDrag({
    type: 'ingredients',
    item,
    collect: monitor => ({
      opacity: monitor.isDragging()? 0.2 : 1
    })
  });

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(passIngredient(item));
  }

  return(
    <li className={Style.card} type='button' onClick={handleOpenModal} style={{opacity}} ref={dragRef}>
      {counter > 0 && (<Counter count={counter} size={counter > 99 ? "small" : "default"} extraClass="m-1"/>)}
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

Card.propTypes = {
  item: PropTypesBurger.isRequired
}