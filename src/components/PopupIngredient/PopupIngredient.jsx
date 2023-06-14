import { useSelector } from 'react-redux';
import Style from './PopupIngredient.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

export default function PopupIngredient({onClose}) {

  const { id } = useParams();

  const handleClick = (e) => {
    e.stopPropagation();
    onClose();
  }

  const ingredients = useSelector(state => state.ingredients.ingredients);

  const item = ingredients.find(ingredient => ingredient._id === id);

  if (!item) {
    return <p>Ошибка загрузки данных</p>;
  }

  return(
    <div className={`pt-10 pl-10 pr-10 pb-15 ${Style.popupIngredient}`} >
      <div className={Style.header}>
        <h1 className='text text_type_main-large'>Детали ингредиента</h1>
        <button className={Style.button} onClick={handleClick}>
          <CloseIcon type='primary' />
        </button>
      </div>
      <img src={item.image_large} alt={item.name} />
      <p className='text text_type_main-medium mb-8 mt-4'>{item.name}</p>
      <ul className={Style.infoList}>
        <li>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{item.calories}</p>
        </li>
        <li>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{item.proteins}</p>
        </li>
        <li>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{item.fat}</p>
        </li>
        <li>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{item.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}