import { SingleStock, UserStock } from '@the5ers-home-assignment/schemas';
import classes from './stock-list.module.scss';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../../services/user.service';
import { getUser } from '../../utils/user.utils';
import { Button, message } from 'antd';
import { loader } from '../../constants/general';
import { useNavigate } from 'react-router-dom';

export interface StockListProps {}

// Suggested feature: merging this stock signle stock and StockCard component

export const StockList = (props: StockListProps) => {
  const navigate = useNavigate();
  const { data, status } = useQuery({
    queryKey: ['user-stocks'],
    // change it back to await userService.getStocks() after finishing styling
    queryFn: async () => await userService.getStocks(),
    initialData: () => getUser().stocks,
  });

  // uncomment to debug
  // console.log('🚀 ~ StockList ~ data:', data);

  if (status === 'error') {
    message.error({
      content: 'Failed to fetch user stocks. Please try again later.',
      key: 'user-stock-error',
    });
    console.error('Error fetching stocks:', data);
  }

  return (
    <section className={classes.container}>
      <header>
        <h4>Stock List</h4>
      </header>
      <main>
        {status === 'success' &&
          data.map(({ name, symbol }: UserStock) => (
            <div className={classes.stock}>
              <main>
                <p>
                  <strong>Name: </strong>
                  {name}
                </p>
                <p>
                  <strong>Symbol: </strong>
                  {symbol}
                </p>
              </main>
              <footer>
                <Button
                  type="primary"
                  onClick={() => navigate(`/stock/${symbol}`)}
                >
                  View Stock Details
                </Button>
              </footer>
            </div>
          ))}
      </main>
    </section>
  );
};
