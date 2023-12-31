import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './Login.module.css';
import { authUser } from '../../services/reducers/handleUserSlice';
import { useForm } from '../../hooks/useForm';
import { RootState } from '../../utils/AppThunk.types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { LogginForm } from '../../utils/apiBackend';
const LoginPage = () => {

  const { values, handleChange} = useForm({email: '', password: ''});
  const dispatch = useAppDispatch();
  const loading = (state: RootState) => state.user.loading;
  const isLoading = useAppSelector(loading);
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const logginData: LogginForm = {
      email: values.email,
      password: values.password
    };
    dispatch(authUser(logginData));
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