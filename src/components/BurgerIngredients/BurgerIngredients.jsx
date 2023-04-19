import TabMenu from "../TabMenu/TabMenu";
import Wrapper from "../Wrapper/Wrapper";
import Style from './BurgerIngredients.module.css';
import CardList from "../CardList/CardList";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import PopupIngredient from "../PopupIngredient/PopupIngredient";
import { resetData } from "../../services/actions/ingredientAction";
import { useRef, useState } from "react";


const BurgerIngredients = () => {

  const data = useSelector(store => store.ingredients.ingredients);
  const dispatch = useDispatch();

  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const fillings = data.filter(item => item.type === 'main');

  const ingredient = useSelector(store => store.ingredient.ingredient);
  
  const handleCloseModal = () => {
    dispatch(resetData());
  }

  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [current, setCurrent] = useState('one');
  

  const handleScroll = () => {
    
    if (containerRef.current.getBoundingClientRect().top > bunRef.current.getBoundingClientRect().top) {
      setCurrent('one');
    } else if (containerRef.current.getBoundingClientRect().top > sauceRef.current.getBoundingClientRect().top) {
      setCurrent('two');
    } else if (containerRef.current.getBoundingClientRect().top > mainRef.current.getBoundingClientRect().top) {
      setCurrent('Three');
    }
    
  }

  return(
    <section className={`${Style.section} pt-10 pl-5`}>
      <Wrapper>
      <h1 className={`text text_type_main-large pb-5`}>
        Соберите бургер
      </h1>
      <TabMenu bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current}/>
      <div className={`${Style.main} mt-10`} ref={containerRef} onScroll={handleScroll}>
        <CardList category={'Булки'} items={buns} ref={bunRef}/>
        <CardList category={'Соусы'} items={sauces} ref={sauceRef}/>
        <CardList category={'Начинки'} items={fillings} ref={mainRef}/>
      </div>
      </Wrapper>
      {ingredient && (
        <Modal onClose={handleCloseModal}>
          <PopupIngredient onClose={handleCloseModal} />
        </Modal>
      )}
    </section>
  )
}


export default BurgerIngredients;