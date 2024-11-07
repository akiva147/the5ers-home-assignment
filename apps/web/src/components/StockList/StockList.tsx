import { observer } from 'mobx-react';
import { Button, message } from 'antd';
import classes from './stock-list.module.scss';
import { loader } from '../../constants/general';
import { StockCard } from '../StockCard';
import { stockStore } from './store';
import { useStockList } from './useStockList';
import { useNavigate } from 'react-router-dom';

export interface StockListProps {}

export const StockList = observer((props: StockListProps) => {
  const navigate = useNavigate();
  const { data, status, deleteStock } = useStockList();

  // Error handling
  if (status === 'error' && stockStore.error) {
    message.error(stockStore.error);
  }

  return (
    <section className={classes.container}>
      <header>
        <h4>Stock List</h4>
      </header>
      <main>
        {status === 'loading' ? (
          loader
        ) : status === 'success' && data?.length === 0 ? (
          <p>Add Stock to your list to see them here</p>
        ) : (
          data?.map(({ name, symbol }) => (
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

                <Button danger onClick={() => deleteStock(symbol)}>
                  Delete Stock From List
                </Button>
              </footer>
            </div>
          ))
        )}
      </main>
    </section>
  );
});
