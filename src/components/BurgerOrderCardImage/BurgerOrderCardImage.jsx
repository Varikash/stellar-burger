import Style from './BurgerOrderCardImage.module.css';

const BurgerOrderCardImage = ({picsUrl, lastPicture, count}) => {

  return (
    <ul className={`${Style.orderPics}`}>
      {picsUrl.map((imageUrl, index) => {
      return(
        <li className={`${Style.background}`}>
          <img key={index} src={imageUrl} className={`${Style.image}`}/>
        </li>
      )
    })
    }
      {count && <li className={`${Style.background}`}>
        <img src={lastPicture} className={`${Style.image}`}/>
        <span className={`${Style.count} text text_type_digits-default`}>{count}</span>
      </li>}
    </ul>
  )
  
}

export default BurgerOrderCardImage