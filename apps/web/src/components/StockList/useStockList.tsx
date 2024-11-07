import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../services/user.service';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
export const useStockList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ['user-stocks'],
    queryFn: async () => await userService.getStocks(),
  });

  const deleteStockMutation = useMutation({
    mutationFn: async (symbol: string) => await userService.deleteStock(symbol),
    onSuccess: () => {
      message.success({
        content: 'Stock deleted successfully.',
        key: 'stock-delete',
        onClick: () => navigate('/portfolio'),
      });
      queryClient.invalidateQueries({ queryKey: ['user-stocks'], exact: true });
    },
    onError: (error) => {
      message.error({
        content: 'Failed to delete stock. Please try again later.',
        key: 'stock-delete-error',
      });
      console.error('Error deleting stock:', error);
    },
  });

  const deleteStock = (symbol: string) => {
    deleteStockMutation.mutate(symbol);
  };

  return { data, status, deleteStock, navigate };
};
