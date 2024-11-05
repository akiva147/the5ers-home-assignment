import { Outlet } from 'react-router-dom';
import classes from './layout.module.scss';
import { Sidebar } from '../Sidebar';

export interface LayoutProps {}

export const Layout = (props: LayoutProps) => {
  return (
    <div className={classes.container}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
