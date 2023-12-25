import Style from './BurgerOrderCardImage.module.css';

type TBurgerOrderCardImageProps = {
  picsUrl: string[];
  lastPicture: string | null;
  count: string | null;
}


const BurgerOrderCardImage = ({picsUrl, lastPicture, count}: TBurgerOrderCardImageProps): JSX.Element => {

  return (
    <ul className={`${Style.orderPics}`}>
      {picsUrl.map((imageUrl, index) => {
      return(
        <li key={index} className={`${Style.background}`}>
          <img src={imageUrl} className={`${Style.image}`}/>
        </li>
      )
    })
    }
      {lastPicture && count && <li className={`${Style.background}`}>
        <img src={lastPicture} className={`${Style.image}`}/>
        <span className={`${Style.count} text text_type_digits-default`}>{count}</span>
      </li>}
    </ul>
  )
  
}

export default BurgerOrderCardImage