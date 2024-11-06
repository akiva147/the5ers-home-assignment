import { Navigate, Route, Routes } from 'react-router-dom';
import { RootErrorBoundary } from './components/RootErrorBoundary';
import {
  authenticatedRoutes,
  defaultRoute,
  publicRoutes,
} from './constants/routes.const';
import { Layout } from './components/Layout';
import { AuthRoutes } from './components/AuthRoutes';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<RootErrorBoundary />}>
        <Route index element={<Navigate to={defaultRoute} />} />
        <Route element={<AuthRoutes />}>
          {Object.values(authenticatedRoutes).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        {Object.values(publicRoutes).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="/*" element={<Navigate to={defaultRoute} />} />
      </Route>
    </Routes>
  );
}

export default App;
