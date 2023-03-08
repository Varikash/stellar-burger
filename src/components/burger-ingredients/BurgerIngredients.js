import TabMenu from "../tab-menu/TabMenu";
import Style from './BurgerIngredients.module.css';
import {data} from '../utils/data';
import CardList from "../cardList/CardList";


function BurgerIngredients() {
  const categories = ['Булки', 'Соусы', 'Начинки'];

  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const fillings = data.filter(item => item.type === 'main');

  return(
    <>
      <TabMenu />
      <div className={Style.main}>
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
    </>
    
    
  )
}

export default BurgerIngredients;