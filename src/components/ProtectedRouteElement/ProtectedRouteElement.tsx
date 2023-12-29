import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../utils/AppThunk.types';
import { useAppSelector } from '../../hooks/hooks';

const Protected = ({onlyUnAuth = false, component }: {onlyUnAuth: boolean, component: JSX.Element}) => {
  const checkAuthorisation = (state: RootState) => state.user.checked;
  const userData = (state: RootState) => state.user.user;
  const isAuthChecked = useAppSelector(checkAuthorisation);
  const user = useAppSelector(userData);
  const location = useLocation();

  if (!isAuthChecked) {
    return null
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || {from: {pathname: '/'}};
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state = {{from: location}} />
  }

  return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}:{component: JSX.Element}) => {
  return <Protected onlyUnAuth={true} component={component} />
}