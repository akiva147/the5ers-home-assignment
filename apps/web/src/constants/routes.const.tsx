import { SignupPage } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';
import { PortfolioPage } from '../pages/PortfolioPage';

export type Route = { title: string; path: string; element: JSX.Element };

export type Routes = Record<string, Route>;

export const defaultRoute = '/portfolio';

export const authenticatedRoutes: Routes = {
  '/portfolio': {
    title: 'Portfolio',
    path: '/portfolio',
    element: <PortfolioPage />,
  },
};

export const publicRoutes: Routes = {
  '/login': { title: 'Login', path: '/login', element: <LoginPage /> },
  '/signup': { title: 'Signup', path: '/signup', element: <SignupPage /> },
};
