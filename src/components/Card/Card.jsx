import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from './Card.module.css';
import PropTypesBurger from '../../utils/PropTypesShape';
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";


function Card({item}) {

  const getIngredientsData = state => state.orderList;
  const ingredientsData = useSelector(getIngredientsData);
  const { bunItem, ingredientsList } = ingredientsData;
  const location = useLocation();
  const itemID = item._id;

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


  return(
    <Link
      key={itemID}
      to={`/ingredients/${itemID}`}
      state={{ background: location }}
      className={Style.link}
    >
      <li className={Style.card} type='button'  style={{opacity}} ref={dragRef}>
        {counter > 0 && (<Counter count={counter} size={counter > 99 ? "small" : "default"} extraClass="m-1"/>)}
        <img src={item.image} alt={item.name} className={Style.image}/>
        <div className={Style.priceBlock}>
          <span className="text text_type_digits-default">{item.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${Style.text} text text_type_main-default`}>{item.name}</p>
      </li>
    </Link>
    
  )
}

export default Card

Card.propTypes = {
  item: PropTypesBurger.isRequired
}