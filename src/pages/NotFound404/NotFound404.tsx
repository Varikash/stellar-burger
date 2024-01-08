import Styles from './NotFound404.module.css'
import { Link } from 'react-router-dom'

const NotFound404 = (): JSX.Element => {
  return(
    <>
    <div className={Styles.container}>
      <h1 className={Styles.text}>Упс, страница не найдена</h1>
      <Link to='/'>
        <p className={Styles.link}>Вернуться на главную страницу</p>
      </Link>
    </div>
    </>
  )
}

export default NotFound404;