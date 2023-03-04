import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Wrapper from '../wrapper/Wrapper.js';
import Style from './AppHeader.module.css'


function AppHeader() {
    return (
      <header className={`${Style.header} pb-4 pt-4`}>
        <Wrapper>
          <div className={Style.flexContainer}>
            <div className={Style.wrapper}>
              <div className={Style.iconWrapper}>
                <BurgerIcon type='primary'/>
                <p className={`${Style.text} text text_type_main-default`}>Конструктор</p>
              </div>
              <div className={Style.iconWrapper}>
                <ListIcon type='secondary' />
                <p className={`${Style.text} text text_type_main-default text_color_inactive`}>Лента заказов</p>
              </div>
            </div>
            <div className={Style.logo}>
              <Logo />
            </div>
            <div className={Style.icon}> 
              <div className={Style.iconWrapper}>
                <ProfileIcon type='secondary' />
                <p className={`${Style.text} text text_type_main-default text_color_inactive`}>Личный кабинет</p>
              </div>
            </div>
          </div>
        </Wrapper>
      </header>
    )
}

export default AppHeader;