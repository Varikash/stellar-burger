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
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';


function BurgerConstructor() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getIngredientsData = state => state.orderList;
  const ingredientsData = useSelector(getIngredientsData);
  const { bunItem, ingredientsList } = ingredientsData;

  const getOrderNumber = state => state.orders.number;
  const orderNumber = useSelector(getOrderNumber);

  const userInfo = state => state.user.loggedIn;
  const isUserLogged = useSelector(userInfo);

  const [ , dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(addBun(item));
      } else {
        const key = uuidv4();
        const ingredientWithKey = {
          ...item,
          key
        }
        dispatch(addIngredient(ingredientWithKey));
      }
    },
  });

  const handleCloseModal = () => {
    dispatch(clearOrder());
    dispatch(resetIngredients());
  };
  const handleOpenModal = () => {
    if (isUserLogged) {
      const token = localStorage.getItem('accessToken');
      const bunID = bunItem._id;
      const components = ingredientsList.map(ingredient => ingredient._id);
      const burgerComponentsID = [bunID,...components,bunID];
      dispatch(fetchOrder(burgerComponentsID, token));
    } else {
      const currentPath = location.pathname;
      navigate('/login', { state: { redirect: currentPath } });
    }
  };

  const totalPrice = useMemo(() => {
    const bunPrice = bunItem ? bunItem.price * 2 : 0;
    return ingredientsList.reduce((acc, ingredient) => acc + ingredient.price, bunPrice)
  }, [ingredientsList, bunItem])
  
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

        </>
  
        ) : (
          <>
            <p className={`${Style.call}`}>Не голодай, перетаскивай еду.</p>
          </>
        )
      }

      <div className={`${Style.order} mt-10`}>
        <p className={`${Style.paragraph} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type={'primary'} />
        </p>
          <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal} disabled={bunItem && ingredientsList.length > 0 ? false : true}>
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