import { Navigate } from 'react-router-dom';
import { RootState } from '../../utils/AppThunk.types';
import { useAppSelector } from '../../hooks/hooks';

const GuestRouteElement = ({ element }:{element: JSX.Element}): JSX.Element => {
  const login = (state: RootState) => state.user.loggedIn;
  const handleLogin = useAppSelector(login);
  return handleLogin ? <Navigate to="/" replace/> : element;
}

export default GuestRouteElement;