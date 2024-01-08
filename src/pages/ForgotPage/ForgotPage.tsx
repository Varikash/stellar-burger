import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import Style from './ForgotPage.module.css';
import { checkEmail } from '../../services/reducers/forgotPasswordSlice';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const ForgotPage = (): JSX.Element => {
  const state = useAppSelector(store => store.getEmail)
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({email: ''})
  const navigate = useNavigate();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(checkEmail(values.email));
  }
  useEffect(() => {
    if (state.success) {
      navigate('/reset-password');
    }
  }, [state.success, navigate])
  
  return (
    <section className={`${Style.section} pt-45`}>
      <form className={Style.container} onSubmit={onSubmit}>
        <h1 className={`${Style.title}`}>Восстановление пароля</h1>
        
        {state.loading ? (
          <div className={Style.loader}></div>
        ) : (
          <>
            <EmailInput 
              name={'email'}
              isIcon={false}
              onChange={handleChange}
              value={values.email}
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass={`${Style.button} mb-20`}>
              Восстановить
            </Button>
          </>
        )}

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