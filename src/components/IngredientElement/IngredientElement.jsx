import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from "react";
import { moveIngredient, deleteIngredient } from "../../services/reducers/burgerConstructionSlice";
import Style from './IngredientElement.module.css'


const IngredientElement = ({index, item}) => {

  const dispatch = useDispatch();
  const ref = useRef(null);
  const { key } = item;

  const handleDelete = (item, index) => {
    dispatch(deleteIngredient(item, index))
  }

  const [{ opacity }, drag] = useDrag({
    type: 'item',
    item: { key, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.8 : 1,
      };
    },
  });

  const [, drop] = useDrop({
    accept: 'item',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragElIndex = item.index;
      const hoverElIndex = index;
      dispatch(moveIngredient({dragElIndex, hoverElIndex}));
      item.index = hoverElIndex;
    },
  });

  drag(drop(ref));

  return(
    <li ref={ref} className={`${Style.item}`} style={{opacity}}>
    <DragIcon type={'primary'} />
    <ConstructorElement
      text={`${item.name}`}
      price={item.price}
      thumbnail={item.image}
      handleClose={() => {handleDelete()}}
    />
    </li>
    
  )
}


export default IngredientElement