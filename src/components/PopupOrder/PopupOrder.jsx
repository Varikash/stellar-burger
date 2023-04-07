import Style from './PopupOrder.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import done from '../../images/order accpeted/done.svg'

function PopupOrder ({onClose, orderNumber}) {

  const handleClick = (e) => {
    e.stopPropagation();
    onClose();
  }

  return(
    <>
      <button className={Style.closeButton} onClick={handleClick}>
        <CloseIcon type='primary'/>
      </button>
      <h1 className={`${Style.header} text text_type_digits-large`}>{orderNumber}</h1>
      <p className='mt-8 text text_type_main-medium'>Идентификатор заказа</p>
      <img src={done} alt="готово" className='mt-15 mb-15'/>
      <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default PopupOrder;