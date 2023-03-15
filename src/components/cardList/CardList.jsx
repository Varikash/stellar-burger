import Card from "../Card/Card";

import Style from './CardList.module.css';

function CardList(props) {
  const { category, items } = props;

  return(
    <>
    <h1 className="text text_type_main-medium mb-6">{category}</h1>
    <ul className={`${Style.cardsList} pb-10`}>
      {items.map(item => <Card key={item._id} item={item}/>)}
    </ul>
    </>
  )
}

export default CardList;