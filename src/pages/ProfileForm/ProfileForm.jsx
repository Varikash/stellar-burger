import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import Style from './ProfileForm.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../services/reducers/handleUserSlice';

const ProfileForm = () => {

  const [form, setValue] = useState({name: '', email: '', password: ''});
  const [editMode, setEditMode] = useState(false);
  const userData = state => state.user.user;
  const loading = state => state.user.loading;
  const user = useSelector(userData);
  const isLoading = useSelector(loading);
  const dispatch = useDispatch();

  const onChange = e => {
    setEditMode(true);
    setValue({ ...form, [e.target.name]: e.target.value });
  }

  const onReset = e => {
    e.preventDefault();
    setEditMode(false);
    setValue({
      name: user.name,
      email: user.email,
      password: ''
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateUserInfo(form));
    setEditMode(false);
  }

  useEffect(() => {
    if (user) {
      setValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      })
    }
  }, [user])

  

  return(
    <>
      <form
      className={Style.form}
      onReset={onReset}
      onSubmit={onSubmit}
      >
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
        {editMode && (
          <div className={Style.buttonbox}>
            {isLoading ? (
              <div className={Style.spinner}></div>
            ) : (
              <>
                <Button
                  type='secondary'
                  size='large'
                  htmlType='reset'
                > 
                  Отмена
                </Button>
                <Button
                  type='primary'
                  size='large'
                  htmlType='submit'
                > 
                  Сохранить
                </Button>
              </>
            )}
          </div>
        )}
      </form>
    </>
  )
}

export default ProfileForm;