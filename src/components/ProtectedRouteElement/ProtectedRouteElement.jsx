import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// export const ProtectedRouteElement = ({ element }) => {
//   const login = state => state.user.loggedIn;
//   const handleLogin = useSelector(login);
//   return handleLogin ? element : <Navigate to="/login" replace/>
// }

export function ProtectedRouteElement({ element, anonymous = false }) {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

// export function ProtectedRouteElement({ element, anonymous = false }) {
//   const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
//   const navigate = useNavigate();

//   const location = useLocation();
//   const from = location.pathname;

//   // Если разрешен неавторизованный доступ, а пользователь авторизован...
//   if (anonymous && isLoggedIn) {
//     // ...то отправляем его на предыдущую страницу
//     return <Navigate to={from} />;
//   }

//   // Если требуется авторизация, а пользователь не авторизован...
//   if (!anonymous && !isLoggedIn) {
//     // ...то отправляем его на страницу логин
//     navigate('/login', { state: { from } });
//     return null; // Возвращаем null, чтобы компонент не рендерился
//   }

//   // Если все ок, то рендерим внутреннее содержимое
//   return element;
// }
