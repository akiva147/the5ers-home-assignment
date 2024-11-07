import { Outlet, useLocation } from 'react-router-dom';
import classes from './layout.module.scss';
import { Navbar } from '../Navbar';
import { useMemo } from 'react';
import { authenticatedRoutes } from '../../constants/routes.const';

export interface LayoutProps {}

export const Layout = (props: LayoutProps) => {
  const location = useLocation();
  const isAuth = useMemo(
    () => (authenticatedRoutes[location.pathname] ? true : false),
    [location.pathname]
  );

  return (
    <div className={classes.container}>
      {isAuth && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
