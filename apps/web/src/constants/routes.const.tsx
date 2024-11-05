import { PortfolioPage } from '../pages/PortfolioPage';

export type Route = { title: string; path: string; element: JSX.Element };

export type Routes = Record<string, Route>;

export const defaultRoute = '/portfolio';

export const routes: Routes = {
  '/portfolio': {
    title: 'Portfolio',
    path: '/portfolio',
    element: <PortfolioPage />,
  },
};
