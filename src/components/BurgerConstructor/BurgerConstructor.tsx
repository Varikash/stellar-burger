import Style from './BurgerConstructor.module.css';
import { useMemo } from 'react';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import PopupOrder from '../PopupOrder/PopupOrder';
import { fetchOrder, clearOrder } from "../../services/actions/fetchOrder";
import { useDrop } from 'react-dnd';
import { addBun, addIngredient, resetIngredients } from '../../services/reducers/burgerConstructionSlice';
import IngredientElement from '../IngredientElement/IngredientElement';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import TIngredientProps from '../../utils/TIngredientProps.types';
import { useAppDispatch } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/hooks';
import { RootState } from '../../utils/AppThunk.types';

export type TIngredientWithKey = TIngredientProps & {key: string};


function BurgerConstructor(): JSX.Element {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getIngredientsData = (state: RootState) => state.orderList;
  const ingredientsData = useAppSelector(getIngredientsData);
  const { bunItem, ingredientsList } = ingredientsData;

  const getOrderNumber = (state: RootState) => state.orders.number;
  const orderNumber = useAppSelector(getOrderNumber);

  const userInfo = (state: RootState) => state.user.loggedIn;
  const isUserLogged = useAppSelector(userInfo);

  const [ , dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item: TIngredientProps) {
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
      const bunID= bunItem?._id;
      const components = ingredientsList.map((ingredient: TIngredientWithKey) => ingredient._id);
      const burgerComponentsID = bunID ? [bunID,...components,bunID]:[...components];
      dispatch(fetchOrder(burgerComponentsID, token));
    } else {
      const currentPath = location.pathname;
      navigate('/login', { state: { redirect: currentPath } });
    }
  };

  const totalPrice = useMemo(() => {
    const bunPrice = bunItem ? bunItem.price * 2 : 0;
    return ingredientsList.reduce((acc: number, ingredient: TIngredientWithKey) => acc + ingredient.price, bunPrice)
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
              {ingredientsList.map((ingredient: TIngredientWithKey, index: number) => {
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