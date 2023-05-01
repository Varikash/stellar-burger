import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import Style from './ForgotPage.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkEmail } from '../../services/reducers/forgotPasswordSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ForgotPage = () => {
  const state = useSelector(store => store.getEmail)
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(checkEmail(value));
  }

  useEffect(() => {
    if (state.success) {
      navigate('/reset-password');
    }
  }, [state.success, navigate])
  

  return(
    <section className={`${Style.section} pt-45`}>
      <form className={Style.container}>
        <h1 className={`${Style.title}`}>Восстановление пароля</h1>
        <EmailInput 
          name={'email'}
          isIcon={false}
          onChange={handleChange}
          value={value}
        />
        <Button htmlType="button" type="primary" size="medium" extraClass={`${Style.button} mb-20`} onClick={handleClick}>
          Восстановить
        </Button>
        <p className={`${Style.text} text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?&nbsp;
          <Link to='/login' className={Style.link}>
            Войти
          </Link>
        </p>
      </form>
    </section>
  )
}

export default ForgotPage;