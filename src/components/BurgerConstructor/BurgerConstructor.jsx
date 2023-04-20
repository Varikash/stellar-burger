import Style from './BurgerConstructor.module.css';
import { useMemo } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import PopupOrder from '../PopupOrder/PopupOrder';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder, clearOrder } from "../../services/actions/fetchOrder";
import { useDrop } from 'react-dnd';



function BurgerConstructor() {


  // const [, dropTarget] = useDrop({
  //   accept: 'ingredients',
  //   drop(item) {
  //     onDropHandler(item);
  //   },
  // });

  const dispatch = useDispatch();

  const burgerIngredientsData = useSelector(store => store.ingredients.ingredients);
  const orderNumber = useSelector(store => store.orders.number);
  

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
    <section className={`${Style.section} pt-25 pr-5 pl-4`}>
      {/* ref={dropTarget} */}
      <ul className={`${Style.itemList}`}>
        <li className={`${Style.buns}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun?.name} (верх)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </li>
          <ul className={Style.ingredientsList}>
            {ingredients.map(ingredient => {
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
            text={`${bun?.name || ''} (низ)`}
            price={bun?.price}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </li>
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