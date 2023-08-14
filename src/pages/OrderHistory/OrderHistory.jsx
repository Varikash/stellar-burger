import Style from './OrderHistory.module.css'
import BurgerOrderCard from '../../components/BurgerOrderCard/BurgerOrderCard';

const OrderHistory = () => {
  return (
    <div className={`${Style.page}`}>
    <BurgerOrderCard />
    <BurgerOrderCard />
    <BurgerOrderCard />
    <BurgerOrderCard />
    <BurgerOrderCard />
    <BurgerOrderCard />
    <BurgerOrderCard />
    <BurgerOrderCard />
    </div>
    
  )
}

export default OrderHistory;