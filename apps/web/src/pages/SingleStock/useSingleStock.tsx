import { useQuery } from '@tanstack/react-query';
import { stockService } from '../../services/stock.service';

export const useSingleStock = (symbol: string | undefined) => {
  if (!symbol) throw new Error('Symbol is undefined');

  const { data, status } = useQuery({
    enabled: Boolean(symbol),
    queryKey: ['stocks', symbol],
    queryFn: async () => await stockService.getStockBySymbol(symbol),
  });

  return {
    data,
    status,
  };
};
