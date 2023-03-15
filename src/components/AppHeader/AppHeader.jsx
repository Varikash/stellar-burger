import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Wrapper from '../Wrapper/Wrapper.js';
import Style from './AppHeader.module.css'


function AppHeader() {
    return (
      <header className={`${Style.header} pb-4 pt-4`}>
        <Wrapper>
          <div className={Style.flexContainer}>
            <div className={Style.wrapper}>
              <a className={`${Style.iconWrapper} pl-5 pr-5 pb-4 pt-4`} href='#'>
                <BurgerIcon type='primary'/>
                <p className={`${Style.text} text text_type_main-default`}>Конструктор</p>
              </a>
              <a className={`${Style.iconWrapper} pl-5 pr-5 pb-4 pt-4`} href='#'>
                <ListIcon type='secondary' />
                <p className={`${Style.text} text text_type_main-default text_color_inactive`}>Лента заказов</p>
              </a>
            </div>
            <div className={Style.logo}>
              <Logo />
            </div>
            <div className={Style.icon}> 
              <a className={`${Style.iconWrapper} pl-5 pr-5 pb-4 pt-4`} href='#'>
                <ProfileIcon type='secondary' />
                <p className={`${Style.text} text text_type_main-default text_color_inactive`}>Личный кабинет</p>
              </a>
            </div>
          </div>
        </Wrapper>
      </header>
    )
}

export default AppHeader;