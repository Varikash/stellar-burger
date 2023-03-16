import Card from "../Card/Card";
import Style from './CardList.module.css';
import PropTypes from 'prop-types';
import PropTypesBurger from '../utils/PropTypesShape';

function CardList(props) {
  const { category, items } = props;

  return(
    <>
    <h1 className="text text_type_main-medium mb-6" id={`${category}`}>{category}</h1>
    <ul className={`${Style.cardsList} pb-10`}>
      {items.map(item => <Card key={item._id} item={item}/>)}
    </ul>
    </>
  )
}

export default CardList;

CardList.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypesBurger).isRequired,
}