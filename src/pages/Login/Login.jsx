import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './Login.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../services/reducers/handleUserSlice';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {

  const [form, setValue] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const loading = state => state.user.loading;
  const logging = state => state.user.loggedIn;
  const isLoading = useSelector(loading);
  const isLogged = useSelector(logging);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };


  const onSubmit = e => {
    e.preventDefault();
    dispatch(authUser(form));
  }

  return(
    <section className={`${Style.section} pt-45`}>
      <form 
      className={Style.container}
      onSubmit={onSubmit}
      >
        <h1 className={`${Style.title}`}>Вход</h1>
        <EmailInput 
          name='email'
          isIcon={false}
          value={form.email}
          required
          onChange={onChange}
        />
        <PasswordInput 
          name='password'
          icon={"ShowIcon"}
          value={form.password}
          required
          onChange={onChange}
        />
        {isLoading ? (
          <div className={Style.spinner}></div>
        ): (
          <Button htmlType="submit" type="primary" size="medium" extraClass={`${Style.button} mb-20`}>
            Войти
          </Button>
        )}
        <p className={`${Style.text} text text_type_main-default text_color_inactive`}>
          Вы - новый пользователь?&nbsp;
          <Link to='/register' className={Style.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={`${Style.text} text text_type_main-default text_color_inactive`}>
          Забыли пароль?&nbsp;
          <Link to='/forgot-password' className={Style.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </section>
  )
}

export default LoginPage;