import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '../../utils/general.utils';

interface AuthRoutesProps {}

export const AuthRoutes = (props: AuthRoutesProps) => {
  // the token is curretly an empty string
  // because there is no backend logic yet
  const isExpired = isTokenExpired('');

  if (isExpired) return <Navigate to="/login" />;

  return <Outlet />;
};
