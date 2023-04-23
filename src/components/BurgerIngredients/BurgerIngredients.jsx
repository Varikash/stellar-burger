import TabMenu from "../TabMenu/TabMenu";
import Wrapper from "../Wrapper/Wrapper";
import Style from './BurgerIngredients.module.css';
import CardList from "../CardList/CardList";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import PopupIngredient from "../PopupIngredient/PopupIngredient";
import { resetData } from "../../services/actions/ingredientAction";
import { useMemo, useRef, useState } from "react";


const BurgerIngredients = () => {

  const data = useSelector(store => store.ingredients.ingredients);
  const dispatch = useDispatch();

  const buns = useMemo(() => {
    return data.filter(item => item.type === 'bun');
  }, [data]);
  
  
  const sauces = useMemo(() => {
    return data.filter(item => item.type === 'sauce');
  }, [data]);
  
  const fillings = useMemo(() => {
    return data.filter(item => item.type === 'main');
  }, [data]) 

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
    const containerRect = containerRef.current.getBoundingClientRect();
    const bunRect = bunRef.current.getBoundingClientRect();
    const sauceRect = sauceRef.current.getBoundingClientRect();
    const mainRect = mainRef.current.getBoundingClientRect();
    
    if (containerRect.top > bunRect.top) {
      setCurrent('one');
    } 
    if (containerRect.top > sauceRect.top) {
      setCurrent('two');
    }
    if (containerRect.top > mainRect.top) {
      setCurrent('three');
    }
    
  }

  return(
    <section className={`${Style.section} pt-10 pl-5`}>
      <Wrapper>
      <h1 className={`text text_type_main-large pb-5`}>
        Соберите бургер
      </h1>
      <TabMenu bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current}/>
      <div className={`${Style.main}`} ref={containerRef} onScroll={handleScroll}>
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