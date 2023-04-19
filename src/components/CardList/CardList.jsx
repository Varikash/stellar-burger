import Card from "../Card/Card";
import Style from './CardList.module.css';
import PropTypes from 'prop-types';
import PropTypesBurger from '../../utils/PropTypesShape';
import { forwardRef } from "react";

const CardList = forwardRef((props, ref) => {
  const { category, items } = props;

  return(
    <div ref={ref}>
      <h1 className="text text_type_main-medium mb-6 pt-10" id={`${category}`}>{category}</h1>
      <ul className={`${Style.cardsList}`}>
        {items.map(item => <Card key={item._id} item={item}/>)}
      </ul>
    </div>
  )
})

export default CardList;

CardList.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypesBurger).isRequired,
}