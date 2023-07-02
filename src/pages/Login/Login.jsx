import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../services/reducers/handleUserSlice';
import { useForm } from '../../hooks/useForm';
const LoginPage = () => {

  const { values, handleChange} = useForm({email: '', password: ''});
  const dispatch = useDispatch();
  const loading = state => state.user.loading;
  const isLoading = useSelector(loading);
  
  
  const onSubmit = e => {
    e.preventDefault();
    dispatch(authUser(values))
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
              value={values.email}
              required
              onChange={handleChange}
            />
            <PasswordInput 
              name='password'
              icon={"ShowIcon"}
              value={values.password}
              required
              onChange={handleChange}
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