import Card from "../Card/Card";
import Style from './CardList.module.css';
import { forwardRef } from "react";
import TIngredientProps from "../../utils/TIngredientProps.types";

type CardListProps = {
  category: string;
  items: TIngredientProps[];
}

const CardList = forwardRef<HTMLDivElement, CardListProps>(({ category, items }, ref) => {

  return(
    <div ref={ref}>
      <h1 className="text text_type_main-medium mb-6 pt-10" id={`${category}`}>{category}</h1>
      <ul className={`${Style.cardsList}`}>
        {items.map(item => <Card key={item._id} item={item}/>)}
      </ul>
    </div>
  )
})

export default CardList;