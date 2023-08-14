import BurgerOrderCardSmall from '../../components/BurgerOrderCardSmall/BurgerOrderCardSmall';
import Wrapper from '../../components/Wrapper/Wrapper';
import Style from './Feed.module.css';

const Feed = () => {

  const arrayReady = ['34533', '34532', '34530', '34530', '34530', '333333', '333333', '333333', '333333', '333333', '333333', '333333', '333333', '333333', '333333', '333333', '333333'];
  const arrayProgress = ['3453', '34541', '34542'];



  return (
      <Wrapper>
        <p className={`${Style.header} text text_type_main-large`}>Лента Заказов</p>
        <div className={`${Style.container}`}>
          <div className={`${Style.feedLog}`}>
            <BurgerOrderCardSmall />
            <BurgerOrderCardSmall />
            <BurgerOrderCardSmall />
            <BurgerOrderCardSmall />
          </div>
          <div className={`${Style.feedData}`}>
            <div className={`${Style.feedStatus}`}>
              <div className={`${Style.feedReady}`}>
                <p className={`${Style.headerStatus} text text_type_main-large`}>Готовы:</p>
                <ul className={`${Style.list}`}>
                {arrayReady.map((element, index) => (
                  <li key={index} 
                  className={`${Style.readyList} text text_type_digits-default`}>
                    {element}
                  </li>
                ))}
                </ul>
              </div>
              <div className={`${Style.feedProcessing}`}>
                <p className={`${Style.headerStatus} text text_type_main-large`}>В работе:</p>
                <ul className={`${Style.list}`}>
                {arrayProgress.map((element, index) => (
                  <li key={index} 
                  className={`${Style.processingList} text text_type_digits-default`}>
                    {element}
                  </li>
                ))}
                </ul>
              </div>
            </div>
            <div>
              <p className={`text text_type_main-large`}>Выполненно за всё время</p>
              <p className={`${Style.number} text text_type_digits-large`}>28752</p>
            </div>
            <div>
              <p className={`${Style.headerToday} text text_type_main-large`}>Выполненно за сегодня:</p>
              <p className={`${Style.number} text text_type_digits-large`}>138</p>
            </div>
          </div>
        </div>
      </Wrapper>
  )
}

export default Feed;