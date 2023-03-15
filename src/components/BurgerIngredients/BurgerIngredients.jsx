import TabMenu from "../TabMenu/TabMenu";
import Wrapper from "../Wrapper/Wrapper";
import Style from './BurgerIngredients.module.css';
import {data} from '../utils/data';
import CardList from "../CardList/CardList";


function BurgerIngredients() {
  const categories = ['Булки', 'Соусы', 'Начинки'];

  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const fillings = data.filter(item => item.type === 'main');

  return(
    <section className={`${Style.section} pt-10 pl-5`}>
      <Wrapper>
      <h1 className={`text text_type_main-large pb-5`}>
        Соберите бургер
      </h1>
      <TabMenu/>
      <div className={`${Style.main} mt-10`}>
        
        {categories.map((category, index) => {
          let items = [];

          if (category === 'Булки') {
            items = buns;
          } else if (category === 'Соусы') {
            items = sauces;
          } else if (category === 'Начинки') {
            items = fillings;
          }

          return <CardList key={index} category={category} items={items} />
        })}
      </div>
      </Wrapper>
    </section>
  )
}




export default BurgerIngredients;