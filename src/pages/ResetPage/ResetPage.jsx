import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Style from './ResetPage.module.css';

const ResetPage = () => {
  return(
    <section className={`${Style.section} pt-45`}>
      <form className={Style.container}>
        <h1 className={`${Style.title}`}>Восстановление пароля</h1>
        <PasswordInput 
          name={'password'}
          icon={"ShowIcon"}
          placeholder={'Введите новый пароль'}
        />
        <Input 
          type={'text'}
          placeholder={'Введите код из письма'}
        />
        <Button htmlType="button" type="primary" size="medium" extraClass={`${Style.button} mb-20`}>
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