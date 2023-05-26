import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './ProfileForm.module.css'
import { useState } from 'react';

const ProfileForm = () => {

  const [form, setValue] = useState({name: '', email: '', password: ''})
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  }

  return(
    <>
      <form>
        <Input 
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          name='name'
          required
          minLength={2}
          maxLength={30}
          extraClass='mb-6'
          value={form.name}
          onChange={onChange}
        />
        <Input 
          type={'email'}
          placeholder={'Логин'}
          icon={'EditIcon'}
          name='email'
          required
          minLength={2}
          maxLength={30}
          extraClass='mb-6'
          value={form.email}
          onChange={onChange}
        />
        <Input 
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          name='password'
          required
          minLength={2}
          maxLength={30}
          extraClass='mb-6'
          value={form.password}
          onChange={onChange}
        />
      </form>
    </>
  )
}

export default ProfileForm;