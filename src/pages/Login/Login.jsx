import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import Style from './Login.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../services/reducers/handleUserSlice';

const LoginPage = () => {

  const [form, setValue] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const userData = state => state.user.user;
  const loading = state => state.user.loading;
  const error = state => state.user.error;
  const handleError = useSelector(error);
  const isLoading = useSelector(loading);
  const user = useSelector(userData);
  const navigate = useNavigate();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(authUser(form))
    .then(() => {
      navigate('/profile', { replace: true });
    })
    .catch(error => {
      throw new Error('ошибка переадресации');
    })
  }

  if (handleError) {
    alert(handleError.message);
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