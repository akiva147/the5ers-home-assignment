import { UserStock } from '@the5ers-home-assignment/schemas';
import classes from './stock-list.module.scss';
import { Button, message } from 'antd';
import { loader } from '../../constants/general';
import { useStockList } from './useStockList';

export interface StockListProps {}

// Suggested feature: merging this stock signle stock and StockCard component

export const StockList = (props: StockListProps) => {
  const { data, deleteStock, status, navigate } = useStockList();
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
        {status === 'pending' ? (
          loader
        ) : status === 'success' && data?.length === 0 ? (
          <p>Add Stock to your list to see them here</p>
        ) : (
          data?.map(({ name, symbol }: UserStock) => (
            <div className={classes.stock} key={symbol}>
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

                <Button
                  variant="filled"
                  danger
                  onClick={() => deleteStock(symbol)}
                >
                  Delete Stock From List
                </Button>
              </footer>
            </div>
          ))
        )}
      </main>
    </section>
  );
};
