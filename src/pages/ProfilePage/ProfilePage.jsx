import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Style from './ProfilePage.module.css';
import { logOutUser } from '../../services/reducers/handleUserSlice';
import { useDispatch, useSelector } from 'react-redux';



const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logOutUser())
  }

  return(
    <div className={Style.page}>
      <div className={Style.container}>
        <nav className={Style.navigation}>
        <ul className={Style.list}>
          <li className={Style.point}>
            <NavLink 
              to='.'
              end
              className={({ isActive }) => isActive? `${Style.activeLink} text text_type_main-medium` :`${Style.link} text text_type_main-medium` }
            >Профиль</NavLink>
          </li>
          <li className={Style.point}>
            <NavLink
              to='/profile/order-history'
              className={({ isActive }) => isActive? `${Style.activeLink} text text_type_main-medium` :`${Style.link} text text_type_main-medium` }
            >История заказов</NavLink>
          </li>
          <li className={Style.point}>
            <button
              className={`${Style.button} text text_type_main-medium` }
              onClick={onClick}
            >Выход</button>
          </li>
        </ul>
        <p className={`${Style.text} text text_type_main-small mt-20`}>
          В этом разделе вы можете <br />
          изменить свои персональные данные
        </p>
      </nav>

      <div className={Style.form}>
        <Outlet/>
      </div>
      </div>
    </div>
  )
}

export default ProfilePage;