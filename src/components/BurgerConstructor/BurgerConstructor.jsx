import Style from './BurgerConstructor.module.css';
import { useState } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import PopupOrder from '../PopupOrder/PopupOrder';
import { useContext } from "react";
import { ApiContext } from "../utils/apiContext";



// {
// calories: 420
// carbohydrates: 53
// fat: 24
// image: "https://code.s3.yandex.net/react/code/bun-02.png"
// image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
// image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
// name: "Краторная булка N-200i"
// price: 1255
// proteins: 80
// type: "bun"
// __v: 0
// _id: "60d3b41abdacab0026a733c6"
// }

function BurgerConstructor() {

  const {state} = useContext(ApiContext);

  const bun = state.find(item => item.type === 'bun');
  const ingredients = state.filter(item => item.type !== 'bun');


  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleOpenModal = () => {
    setShowModal(true);
  }

  if (!state) return <>...Загрузка</>

  return(
    <section className={`${Style.section} pt-25 pr-5 pl-4`}>
      <ul className={`${Style.itemList}`}>
        <li className={`${Style.buns}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun?.name || ''} (верх)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </li>
          <ul className={Style.ingredientsList}>
            {ingredients.map(ingredient => {
              return(
                <li className={Style.item}>
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
          610
          <CurrencyIcon type={'primary'} />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <PopupOrder onClose={handleCloseModal}/>
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor;