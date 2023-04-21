import Style from './BurgerConstructor.module.css';
import { useMemo } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import PopupOrder from '../PopupOrder/PopupOrder';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder, clearOrder } from "../../services/actions/fetchOrder";
import { useDrop } from 'react-dnd';
import { addBun, addIngredient } from '../../services/reducers/burgerConstructionSlice';


function BurgerConstructor() {
  const { bunItem, ingredientsList } = useSelector(store => store.orderList);
  const dispatch = useDispatch();
  const burgerIngredientsData = useSelector(store => store.ingredients.ingredients);
  const orderNumber = useSelector(store => store.orders.number);


  const [ , dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      console.log(item)
      if (item.type === 'bun') {
        dispatch(addBun(item));
        console.log(item);
      } else {
        dispatch(addIngredient(item));
        console.log(item);
      }
    },
  });

  const handleCloseModal = () => {
    dispatch(clearOrder())
  };
  const handleOpenModal = () => {
    dispatch(fetchOrder(burgerComponentsID));
  };

  const bun = useMemo(() => {
    return burgerIngredientsData.find(item => item.type === 'bun');
  }) 
  const bunID = bun._id;

  const ingredients = useMemo(() => {
    return burgerIngredientsData.filter(item => item.type !== 'bun');
  })

  const components = ingredients.map(ingredient => ingredient._id);
  const burgerComponentsID = [bunID,...components,bunID];


  const totalPrice = useMemo(() => {
    return ingredients.reduce((acc, ingredient) => acc + ingredient.price, (bun.price * 2))
  })
  
  return(
    <section className={`${Style.section} pt-25 pr-5 pl-4`} ref={dropTarget}>
      
      <ul className={`${Style.itemList}`}>

        {bunItem || ingredientsList.length > 0 ? (
          <>
          <li className={`${Style.buns}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunItem.name} (верх)`}
            price={bunItem.price}
            thumbnail={bunItem.image}
          />
        </li>

          <ul className={Style.ingredientsList}>
            {ingredientsList.map(ingredient => {
              return(
                <li key={ingredient?._id} className={Style.item}>
                  <DragIcon type={'primary'} />
                  <ConstructorElement
                    text={`${ingredient?.name}`}
                    price={ingredient?.price}
                    thumbnail={ingredient?.image}
                  />
                </li>
              )
            })}
          </ul>

        <li className={Style.buns}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunItem.name || ''} (низ)`}
            price={bunItem.price}
            thumbnail={bunItem.image}
          />
        </li>
        </>

        ) : (
          <>
            Не голодай, перетаскивай жратву.
          </>
        )}

        
      </ul>
    
    
    
    
  

      <div className={`${Style.order} mt-10`}>
        <p className={`${Style.paragraph} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type={'primary'} />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {orderNumber && (
        <Modal onClose={handleCloseModal}>
          <PopupOrder onClose={handleCloseModal}/>
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor;