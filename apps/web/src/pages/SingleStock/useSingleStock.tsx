import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stockService } from '../../services/stock.service';
import { message } from 'antd';
import { userService } from '../../services/user.service';
import { UserStock } from '@the5ers-home-assignment/schemas';

export const useSingleStock = (symbol: string | undefined) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  if (!symbol) throw new Error('Symbol is undefined');

  const { data, status } = useQuery({
    enabled: Boolean(symbol),
    queryKey: ['stocks', symbol],
    queryFn: async () => await stockService.getStockBySymbol(symbol),
  });

  const addStockMutation = useMutation({
    mutationFn: async (stock: UserStock) => await userService.addStock(stock),
    onSuccess: () => {
      message.success({
        content: 'Stock added successfully! Click to see your portfolio.',
        key: 'single-stock-add',
        onClick: () => navigate('/portfolio'),
      });
      queryClient.invalidateQueries({ queryKey: ['user-stocks'], exact: true });
    },
    onError: (error) => {
      message.error({
        content: 'Failed to add stock. Please try again later.',
        key: 'single-stock-add-error',
      });
      console.error('Error adding stock:', error);
    },
  });

  const addStock = () => {
    if (!data) throw new Error('Stock data is undefined');
    addStockMutation.mutate({ name: data.name, symbol: data.symbol });
  };
  return {
    addStock,
    data,
    status,
  };
};
