import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Wrapper from "../Wrapper/Wrapper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function ConstructorPage(): JSX.Element {
  return(
    <section>
      <DndProvider backend={HTML5Backend}>
        <Wrapper>
          <BurgerIngredients />
          <BurgerConstructor/>
        </Wrapper>
      </DndProvider>
    </section>
  )
}

export default ConstructorPage