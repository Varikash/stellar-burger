import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './ForgotPage.module.css';

const ForgotPage = () => {
  return(
    <section className={`${Style.section} pt-45`}>
      <form className={Style.container}>
        <h1 className={`${Style.title}`}>Восстановление пароля</h1>
        <EmailInput 
          name={'email'}
          isIcon={false}
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