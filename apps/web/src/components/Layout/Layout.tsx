import { Outlet, useLocation } from 'react-router-dom';
import classes from './layout.module.scss';
import { Navbar } from '../Navbar';
import { isTokenExpired } from '../../utils/general.utils';

export interface LayoutProps {}

export const Layout = (props: LayoutProps) => {
  const location = useLocation();
  const { isExpired, isUndefined } = isTokenExpired();

  return (
    <div className={classes.container}>
      {!isExpired && !isUndefined && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
