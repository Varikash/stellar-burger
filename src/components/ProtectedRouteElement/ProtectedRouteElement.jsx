import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({onlyUnAuth = false, component }) => {
  const checkAuthorisation = state => state.user.loggedIn;
  const userData = state => state.user.user;
  const isAuthChecked = useSelector(checkAuthorisation);
  const user = useSelector(userData);
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
export const OnlyUnAuth = ({component}) => {
  return <Protected OnlyUnOuth={true} component={component} />
}