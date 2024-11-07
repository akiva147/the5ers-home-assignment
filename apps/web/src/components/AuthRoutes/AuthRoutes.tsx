import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '../../utils/user.utils';
import { message } from 'antd';
import { useEffect } from 'react';

interface AuthRoutesProps {}

export const AuthRoutes = (props: AuthRoutesProps) => {
  const { isExpired, isUndefined } = isTokenExpired();

  useEffect(() => {
    if (isExpired) {
      message.error({
        content: 'Your session has expired. Please log in again.',
        key: 'session-expired',
      });
    }
  }, [isExpired]);

  if (isUndefined || isExpired) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
