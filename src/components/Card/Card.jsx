import { useState } from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from './Card.module.css';
import PropTypesBurger from '../utils/PropTypesShape';
import Modal from "../Modal/Modal";
import PopupIngredient from "../PopupIngredient/PopupIngredient";

function Card(props) {
  const { item } = props;
  const [showModal, setShowModal] = useState(false); 
  
  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleOpenModal = () => {
    setShowModal(true);
  }

  return(
    <li className={Style.card} type='button' onClick={handleOpenModal}>
      <Counter count={1} size="default" extraClass="m-1"/>
      <img src={item.image} alt={item.name} className={Style.image}/>
      <div className={Style.priceBlock}>
        <span className="text text_type_digits-default">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${Style.text} text text_type_main-default`}>{item.name}</p>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <PopupIngredient onClose={handleCloseModal} item={item} />
        </Modal>
      )}
    </li>
  )
}

export default Card

Card.propTypes = {
  item: PropTypesBurger.isRequired
}