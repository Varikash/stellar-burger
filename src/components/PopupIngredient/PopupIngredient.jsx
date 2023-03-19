import Style from './PopupIngredient.module.css'

export default function PopupIngredient({item}) {
  return(
    <>
      <h1>{item.name}</h1>
      <img src={item.image_large} alt={item.name} />
      <p>{item.name}</p>
      <ul>
        <li>
          <p>Калории,ккал</p>
          <p>{item.calories}</p>
        </li>
        <li>
          <p>Белки, г</p>
          <p>{item.proteins}</p>
        </li>
        <li>
          <p>Жиры, г</p>
          <p>{item.fat}</p>
        </li>
        <li>
          <p>Углеводы, г</p>
          <p>{item.carbohydrates}</p>
        </li>
      </ul>
    </>
  )
}