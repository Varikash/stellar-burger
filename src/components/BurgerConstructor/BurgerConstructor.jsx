import Style from './BurgerConstructor.module.css';
import { useMemo } from 'react';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import PopupOrder from '../PopupOrder/PopupOrder';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder, clearOrder } from "../../services/actions/fetchOrder";
import { useDrop } from 'react-dnd';
import { addBun, addIngredient, resetIngredients } from '../../services/reducers/burgerConstructionSlice';
import IngredientElement from '../IngredientElement/IngredientElement';


function BurgerConstructor() {
  const { bunItem, ingredientsList } = useSelector(store => store.orderList);
  const dispatch = useDispatch();
  const orderNumber = useSelector(store => store.orders.number);

  const bunPrice = () => {
    if (bunItem !== null) {
      return bunItem.price * 2;
    } else {
      return 0;
    }
  }

  const [ , dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(addBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
  });

  const handleCloseModal = () => {
    dispatch(clearOrder());
    dispatch(resetIngredients());
  };
  const handleOpenModal = () => {
    const bunID = bunItem._id;
    const components = ingredientsList.map(ingredient => ingredient._id);
    const burgerComponentsID = [bunID,...components,bunID];
    dispatch(fetchOrder(burgerComponentsID));
  };

  const totalPrice = useMemo(() => {
    return ingredientsList.reduce((acc, ingredient) => acc + ingredient.price, (bunPrice()))
  })
  
  return(
    <section className={`${Style.section} pt-25 pr-5 pl-4`} ref={dropTarget}>
      

      {bunItem || ingredientsList.length > 0 ? (
        
        <>

          <ul className={`${Style.itemList}`}>

            {bunItem && (
              <li className={`${Style.buns}`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bunItem.name} (верх)`}
                  price={bunItem.price}
                  thumbnail={bunItem.image}
                />
              </li>
            )}
            

            <ul className={Style.ingredientsList}>
              {ingredientsList.map((ingredient, index) => {
                return(
                    <IngredientElement item={ingredient} index={index} key={ingredient.key}/>
                )
              })}
            </ul>
            
            {bunItem && (
              <li className={Style.buns}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bunItem.name || ''} (низ)`}
                  price={bunItem.price}
                  thumbnail={bunItem.image}
                />
              </li>
            )}
          </ul> 
          
          {bunItem && ingredientsList.length > 0? (
            <div className={`${Style.order} mt-10`}>
              <p className={`${Style.paragraph} text text_type_digits-medium`}>
                {totalPrice}
                <CurrencyIcon type={'primary'} />
              </p>
              <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
                Оформить заказ
              </Button>
            </div>
          ):(
            <div className={`${Style.order} mt-10`}>
              <p className={`${Style.paragraph} text text_type_digits-medium`}>
                {totalPrice}
                <CurrencyIcon type={'primary'} />
              </p>
              <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal} disabled>
                Оформить заказ
              </Button>
            </div>
          )}

        </>
  
        ) : (
          <>
            Не голодай, перетаскивай жратву.
            <div className={`${Style.order} mt-10`}>
              <p className={`${Style.paragraph} text text_type_digits-medium`}>
                {totalPrice}
                <CurrencyIcon type={'primary'} />
              </p>
              <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal} disabled>
                Оформить заказ
              </Button>
            </div>
          </>
        )
      }
        
      {orderNumber && (
        <Modal onClose={handleCloseModal}>
          <PopupOrder onClose={handleCloseModal}/>
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor;