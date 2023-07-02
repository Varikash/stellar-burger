import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import Style from './ForgotPage.module.css';
import { useDispatch } from 'react-redux';
import { checkEmail } from '../../services/reducers/forgotPasswordSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';

const ForgotPage = () => {
  const state = useSelector(store => store.getEmail)
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({email: ''})
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(checkEmail(values.email));
  }
  useEffect(() => {
    if (state.success) {
      navigate('/reset-password');
    }
  }, [state.success, navigate])
  

  return(
    <section className={`${Style.section} pt-45`}>
      <form className={Style.container}
        onSubmit={onSubmit}
        >
        <h1 className={`${Style.title}`}>Восстановление пароля</h1>
        <EmailInput 
          name={'email'}
          isIcon={false}
          onChange={handleChange}
          value={values.email}
        />
        <Button htmlType="button" type="primary" size="medium" extraClass={`${Style.button} mb-20`}>
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