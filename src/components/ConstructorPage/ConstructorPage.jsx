import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Wrapper from "../Wrapper/Wrapper";


function ConstructorPage({data}) {

  return(
    <section>
      <Wrapper>
        <BurgerIngredients data={data}/>
        <BurgerConstructor />
      </Wrapper>
    </section>
  )
}

export default ConstructorPage