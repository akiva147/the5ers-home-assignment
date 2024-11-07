import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { UserStock } from '@the5ers-home-assignment/schemas';
import { userService } from '../services/user.service';

export const useAddStock = (type: 'single' | 'list') => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const content =
    type === 'single'
      ? 'Stock added successfully! Click to see your portfolio.'
      : 'Stock added successfully!';

  const addStockMutation = useMutation({
    mutationFn: async (stock: UserStock) => await userService.addStock(stock),
    onSuccess: () => {
      message.success({
        content,
        key: 'single-stock-add',
        onClick: () => {
          if (type === 'single') navigate('/portfolio');
        },
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

  const addStock = (data: Partial<UserStock> | undefined) => {
    if (!data || !data.name || !data.symbol)
      throw new Error('Stock data is undefined');
    addStockMutation.mutate({ name: data.name, symbol: data.symbol });
  };

  return { addStock };
};
