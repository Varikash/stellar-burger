import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './Register.module.css';

const RegisterPage = () => {
  return(
    <section className={`${Style.section} pt-45`}>
      <form className={Style.container}>
        <h1 className={`${Style.title}`}>Регистрация</h1>
        <Input 
          type={'text'}
          placeholder={'Имя'}
        />
        <EmailInput 
          name={'email'}
          isIcon={false}
        />
        <PasswordInput 
          name={'password'}
          icon={"ShowIcon"}
        />
        <Button htmlType="button" type="primary" size="medium" extraClass={`${Style.button} mb-20`}>
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