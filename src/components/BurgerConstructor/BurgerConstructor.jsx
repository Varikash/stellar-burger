import Style from './BurgerConstructor.module.css';
import { useState, useContext, useMemo, useEffect } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import PopupOrder from '../PopupOrder/PopupOrder';
import { ApiContext } from "../utils/apiContext";
import { apiFetch } from '../utils/apiBackend';


function BurgerConstructor() {

  const {state} = useContext(ApiContext);
  const [orderNumber, setOrderNumber] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCloseModal = () => setOrderNumber(undefined);

  const bun = state.find(item => item.type === 'bun');
  const bunID = bun._id;
  const ingredients = state.filter(item => item.type !== 'bun');

  const burgerComponentsID = useMemo(() => {
    const components = ingredients.map(ingredient => ingredient._id);
    return [bunID, ...components, bunID];
  }, [bunID, ingredients]);

  useEffect(() => {
    const initialPrice = bun.price * 2;
    const totalPrice = ingredients.reduce((acc, ingredient) => acc + ingredient.price, initialPrice);
    setTotalPrice(totalPrice);
  }, [state]);

  const fetchIngredientsData = async () => {
    try {
      const data = await apiFetch(burgerComponentsID);
      setOrderNumber(data.order.number);
      console.log(data);
    } catch(error) {
      console.error(error)
    }
  }

  if (!state) return <>...Загрузка</>

  return(
    <section className={`${Style.section} pt-25 pr-5 pl-4`}>
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
        <Button htmlType="button" type="primary" size="large" onClick={fetchIngredientsData}>
          Оформить заказ
        </Button>
      </div>
      {orderNumber && (
        <Modal onClose={handleCloseModal}>
          <PopupOrder onClose={handleCloseModal} orderNumber={orderNumber}/>
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor;