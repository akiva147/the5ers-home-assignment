import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Input, message } from 'antd';
import { useEffect } from 'react';
import { stockService } from '../../services/stock.service';
import classes from './search-stocks.module.scss';
import { SingleStock } from '@the5ers-home-assignment/schemas';
import { StockCard } from '../StockCard';
import { loader } from '../../constants/general';
import { observer } from 'mobx-react';
import { store } from './store';

export interface SearchStocksProps {}

export const SearchStocks = observer((props: SearchStocksProps) => {
  const { data, status, error } = useQuery<SingleStock[]>({
    queryKey: ['stocks', store.query],
    queryFn: () => stockService.getStocks(store.query),
    enabled: store.query.length >= 2, // Trigger only if query length is >= 2
  });

  // MobX state update inside action
  useEffect(() => {
    if (data) {
      store.addData(data);
    }
  }, [data]);

  // Handle error
  useEffect(() => {
    if (status === 'error' && error) {
      message.error('Failed to fetch stocks. Please try again later.');
      console.error('Error fetching stocks:', error);
    }
  }, [status, error]);

  return (
    <section className={classes.container}>
      <header>
        <Input
          prefix={<SearchOutlined />}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length >= 2) {
              store.setQuery(value); // Action to set query in MobX store
            }
          }}
          placeholder="Search Stocks (enter at least 2 characters)"
        />
      </header>
      <main>
        {store.query === '' ? (
          <p>The Searched Stocks Will Appear Here</p>
        ) : status === 'pending' ? (
          loader
        ) : status === 'success' ? (
          store.data.map((stock: SingleStock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))
        ) : null}
      </main>
    </section>
  );
});
