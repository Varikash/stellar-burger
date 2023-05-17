import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './ProfileForm.module.css'

const ProfileForm = () => {
  return(
    <>
      <form>
        <Input 
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          required
          minLength={2}
          maxLength={30}
          extraClass='mb-6'
        />
        <Input 
          type={'email'}
          placeholder={'Логин'}
          icon={'EditIcon'}
          required
          minLength={2}
          maxLength={30}
          extraClass='mb-6'
        />
        <Input 
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          required
          minLength={2}
          maxLength={30}
          extraClass='mb-6'
        />
      </form>
    </>
  )
}

export default ProfileForm;