import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './Register.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../services/reducers/handleUserSlice';
import { Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

const RegisterPage = () => {
  const { values, handleChange } = useForm({name: '', email: '', password: ''});
  const regUser = state => state.user.registered;
  const registered = useSelector(regUser);

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault()
    dispatch(createUser(values));
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
          value={values.name}
          onChange={handleChange}
          required
        />
        <EmailInput 
          name='email'
          isIcon={false}
          onChange={handleChange}
          value={values.email}
          required
        />
        <PasswordInput 
          name='password'
          icon={"ShowIcon"}
          onChange={handleChange}
          value={values.password}
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