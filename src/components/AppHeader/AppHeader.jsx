import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Wrapper from '../Wrapper/Wrapper';
import Style from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AppHeader() {
  
    return (
      <header className={`${Style.header} pb-4 pt-4`}>
        <Wrapper>
          <div className={Style.flexContainer}>
            <div className={Style.wrapper}>
              <NavLink className={`${Style.iconWrapper} pl-5 pr-5 pb-4 pt-4`} to='/'>
                <BurgerIcon type='primary'/>
                <p className={`${Style.text} text text_type_main-default`}>Конструктор</p>
              </NavLink>
              <NavLink className={`${Style.iconWrapper} pl-5 pr-5 pb-4 pt-4`} to='/feed'>
                <ListIcon type='secondary' />
                <p className={`${Style.text} text text_type_main-default text_color_inactive`}>Лента заказов</p>
              </NavLink>
            </div>
            <div className={Style.logo}>
              <Logo />
            </div>
            <div className={Style.icon}>
                <NavLink to="/profile" className={`${Style.iconWrapper} pl-5 pr-5 pb-4 pt-4`}>
                  <ProfileIcon type="secondary" />
                  <p className={`${Style.text} text text_type_main-default text_color_inactive`}>Личный&nbsp;кабинет</p>
                </NavLink>
            </div>
          </div>
        </Wrapper>
      </header>
    )
}

export default AppHeader;