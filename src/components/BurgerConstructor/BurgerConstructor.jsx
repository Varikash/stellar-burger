import Style from './BurgerConstructor.module.css';
import { useState } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import PopupOrder from '../PopupOrder/PopupOrder';

function BurgerConstructor() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleOpenModal = () => {
    setShowModal(true);
  }

  return(
    <section className={`${Style.section} pt-25 pr-5 pl-4`}>
      <ul className={`${Style.itemList}`}>
        <li className={`${Style.buns}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </li>
          <ul className={Style.ingredientsList}>
            <li className={Style.item}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={3000}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
              />
            </li>
            <li className={Style.item}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text="Соус Spicy-X"
                price={90}
                thumbnail={"https://code.s3.yandex.net/react/code/sauce-02.png"}
              /> 
            </li>
            <li className={Style.item}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={3000}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
              />
            </li>
            <li className={Style.item}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text="Соус Spicy-X"
                price={90}
                thumbnail={"https://code.s3.yandex.net/react/code/sauce-02.png"}
              /> 
            </li>
            <li className={Style.item}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text="Говяжий метеорит (отбивная)"
                price={3000}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
              />
            </li>
            <li className={Style.item}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text="Соус Spicy-X"
                price={90}
                thumbnail={"https://code.s3.yandex.net/react/code/sauce-02.png"}
              /> 
            </li>
          </ul>
        <li className={Style.buns}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
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