import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './Register.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../services/reducers/registerUserSlice';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {

  const [form, setValue] = useState({name: '', email: '', password: ''});
  
  const regUser = state => state.registration.registered;
  const registered = useSelector(regUser);

  const dispatch = useDispatch();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault()
    dispatch(createUser(form));
  }

  return(
    <section className={`${Style.section} pt-45`}>
      {registered && <Navigate to='/profile' />}
      <form 
      className={Style.container}
      onSubmit={onSubmit}
        >
        <h1 className={`${Style.title}`}>Регистрация</h1>
        <Input 
          type={'text'}
          placeholder={'Имя'}
          name='name'
          value={form.name}
          onChange={onChange}
          required
        />
        <EmailInput 
          name='email'
          isIcon={false}
          onChange={onChange}
          value={form.email}
          required
        />
        <PasswordInput 
          name='password'
          icon={"ShowIcon"}
          onChange={onChange}
          value={form.password}
          required
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={`${Style.button} mb-20`}>
          Зарегистрироваться
        </Button>
        <p className={`${Style.text} text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?&nbsp;
          <Link to='/login' className={Style.link}>
            Войти
          </Link>
        </p>
      </form>
    </section>
  )
}

export default RegisterPage;