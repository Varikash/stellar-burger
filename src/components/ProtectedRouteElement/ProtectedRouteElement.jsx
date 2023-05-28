import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRouteElement = ({ element }) => {
  const login = state => state.user.loggedIn;
  const handleLogin = useSelector(login);
  return handleLogin ? element : <Navigate to="/login" replace/>
}