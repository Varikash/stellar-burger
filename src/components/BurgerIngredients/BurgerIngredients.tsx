import TabMenu from "../TabMenu/TabMenu";
import Wrapper from "../Wrapper/Wrapper";
import Style from './BurgerIngredients.module.css';
import CardList from "../CardList/CardList";
import { useMemo, useRef, useState } from "react";
import { RootState } from "../../utils/AppThunk.types";
import { useAppSelector } from "../../hooks/hooks";



const BurgerIngredients = () => {

  const getData = (state: RootState) => state.ingredients.ingredients;
  const data = useAppSelector(getData);

  const buns = useMemo(() => {
    return data.filter(item => item.type === 'bun');
  }, [data]);
  
  const sauces = useMemo(() => {
    return data.filter(item => item.type === 'sauce');
  }, [data]);
  
  const fillings = useMemo(() => {
    return data.filter(item => item.type === 'main');
  }, [data]) 

  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState('one');
  

  const handleScroll = () => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const bunRect = bunRef.current?.getBoundingClientRect();
    const sauceRect = sauceRef.current?.getBoundingClientRect();
    const mainRect = mainRef.current?.getBoundingClientRect();
    
    if (containerRect && bunRect && containerRect.top > bunRect.top) {
      setCurrent('one');
    } 
    if (containerRect && sauceRect && containerRect.top > sauceRect.top) {
      setCurrent('two');
    }
    if (containerRect && mainRect && containerRect.top > mainRect.top) {
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
    </section>
  )
}


export default BurgerIngredients;