import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Wrapper from "../Wrapper/Wrapper";


function ConstructorPage() {
  return(
    <section>
      <Wrapper>
        <BurgerIngredients />
        <BurgerConstructor />
      </Wrapper>
    </section>
  )
}

export default ConstructorPage