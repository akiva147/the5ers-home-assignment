import { useEffect } from 'react';
import { stockStore } from './store';

export const useStockList = () => {
  useEffect(() => {
    stockStore.fetchStocks(); // Fetch stocks when the component mounts
  }, []);

  return {
    data: stockStore.stocks,
    status: stockStore.isLoading
      ? 'loading'
      : stockStore.error
      ? 'error'
      : 'success',
    error: stockStore.error,
    deleteStock: stockStore.deleteStock.bind(stockStore), // Bind deleteStock to store instance
  };
};
