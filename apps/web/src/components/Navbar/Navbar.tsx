import { Button } from 'antd';
import classes from './navbar.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { defaultRoute } from '../../constants/routes.const';

export interface NavbarProps {}

export const Navbar = (props: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // We have only two authenticated routes: portfolio and a single stock
  const currPage = useMemo(
    () => (location.pathname === defaultRoute ? 'Your stocks' : 'Stock'),
    [location.pathname]
  );

  const signout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className={classes.container}>
      <span>{currPage}</span>
      <Button type="primary" onClick={() => signout()}>
        Signout
      </Button>
    </header>
  );
};
