import BurgerConstructior from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import Wrapper from "../wrapper/Wrapper";

import Style from './ConstructorPage.module.css';

function ConstructorPage() {
  return(
    <section className={Style.section}>
      <Wrapper>
        <h1 className={`${Style.title} text text_type_main-large`}>
          Соберите бургер
        </h1>
        <BurgerIngredients />
        <BurgerConstructior />
      </Wrapper>
    </section>
  )
}

export default ConstructorPage