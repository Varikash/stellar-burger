import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './ResetPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { NewPassForm, sendNewPass } from '../../utils/apiBackend';
import { useForm } from '../../hooks/useForm';
import { RootState } from '../../utils/AppThunk.types';
import { useAppSelector } from '../../hooks/hooks';

const ResetPage = (): JSX.Element => {
  const { values, handleChange } = useForm({password: '', token: ''})
  const condition = (state: RootState) => state.getEmail.success;
  const state = useAppSelector(condition);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/login');
    }
  }, [state, navigate])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const logginData: NewPassForm = {
      password: values.password,
      token: values.token
    }
    sendNewPass(logginData)
    .then(() => {
      alert("Пароль изменен успешно!");
      navigate('/login');
    })
    .catch(() => alert("Неправильный код из письма"));
  }

  return(
    <section className={`${Style.section} pt-45`}>
      <form 
      className={Style.container}
      onSubmit={onSubmit}
      >
        <h1 className={`${Style.title}`}>Восстановление пароля</h1>
        <PasswordInput 
          name='password'
          icon={"ShowIcon"}
          placeholder={'Введите новый пароль'}
          value={values.password}
          onChange={handleChange}
        />
        <Input 
          name='token'
          type={'text'}
          placeholder={'Введите код из письма'}
          value={values.token}
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={`${Style.button} mb-20`}>
          Сохранить
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

export default ResetPage;