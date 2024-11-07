import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loader } from '../constants/general';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { provider, toValue } from 'react-ioc';

const queryClient = new QueryClient();

export interface GlobalProviderProps {
  children?: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = provider([
  QueryClient,
  toValue(queryClient),
])(({ children }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={loader}>{children}</Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
));
