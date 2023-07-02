import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRouteElement = ({ element }) => {
  const login = state => state.user.loggedIn;
  const handleLogin = useSelector(login);
  return handleLogin ? <Navigate to="/" replace/> : element;
}

export default GuestRouteElement;