import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './Login.module.css';

const LoginPage = () => {
  return(
    <section className={`${Style.section} pt-45`}>
      <form className={Style.container}>
        <h1 className={`${Style.title}`}>Вход</h1>
        <EmailInput 
          name={'email'}
          isIcon={false}
        />
        <PasswordInput 
          name={'password'}
          icon={"ShowIcon"}
        />
        <Button htmlType="button" type="primary" size="medium" extraClass={`${Style.button} mb-20`}>
          Войти
        </Button>
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