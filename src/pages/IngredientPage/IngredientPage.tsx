import { useParams } from "react-router-dom";
import Style from './IngredientPage.module.css'
import NotFound404 from "../NotFound404/NotFound404";
import { useAppSelector } from "../../hooks/hooks";

const IngredientPage = (): JSX.Element => {
  const { id } = useParams();
  const ingredients = useAppSelector(state => state.ingredients.ingredients);
  const ingredient = ingredients.find(ingredient => ingredient._id === id);

  if (!ingredient) {
    return <NotFound404 />
  }

  return(
    <>
      <div className={`${Style.container} mt-30`}>
        <h1 className='text text_type_main-large'>Детали ингредиента</h1>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p className='text text_type_main-medium mb-8 mt-4'>{ingredient.name}</p>
        <ul className={Style.infoList}>
        <li>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
        </li>
        <li>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
        </li>
        <li>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
        </li>
        <li>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
        </li>
      </ul>
      </div>
    </>
  )
}

export default IngredientPage;