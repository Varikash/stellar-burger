import Card from "../card/Card";

import Style from './CardList.module.css';

function CardList(props) {
  const { category, items } = props;

  return(
    <>
    <h1 className="text text_type_main-medium pt-10 mb-6">{category}</h1>
    <ul className={Style.cardsList}>
      {items.map(item => <Card key={item._id} item={item}/>)}
    </ul>
    </>
  )
}

export default CardList;