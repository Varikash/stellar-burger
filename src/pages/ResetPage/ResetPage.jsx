import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './ResetPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sendNewPass } from '../../utils/apiBackend';

const ResetPage = () => {
  const [form, setValue] = useState({password: '', token: ''});
  const condition = state => state.getEmail.success;
  const state = useSelector(condition);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/login');
    }
  }, [state, navigate])

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    sendNewPass(form)
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
          value={form.password}
          onChange={onChange}
        />
        <Input 
          name='token'
          type={'text'}
          placeholder={'Введите код из письма'}
          value={form.token}
          onChange={onChange}
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