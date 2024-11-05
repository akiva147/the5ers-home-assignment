import { Navigate, Route, Routes } from 'react-router-dom';
import { RootErrorBoundary } from './components/RootErrorBoundary';
import { defaultRoute, routes } from './constants/routes.const';
import { Layout } from './components/Layout';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<RootErrorBoundary />}>
        <Route index element={<Navigate to={defaultRoute} />} />
        {Object.values(routes).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
