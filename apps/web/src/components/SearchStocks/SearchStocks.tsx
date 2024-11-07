import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Input, message } from 'antd';
import { useState } from 'react';
import { stockService } from '../../services/stock.service';
import classes from './search-stocks.module.scss';
import { SingleStock } from '@the5ers-home-assignment/schemas';
import { StockCard } from '../StockCard';
import { loader } from '../../constants/general';

export interface SearchStocksProps {}

export const SearchStocks = (props: SearchStocksProps) => {
  const [query, setQuery] = useState('');
  const { data, status } = useQuery({
    queryKey: ['stocks', query],
    queryFn: async () => await stockService.getStocks(query),
  });
  if (status === 'error') {
    message.error({
      content: 'Failed to fetch stocks. Please try again later.',
      key: 'stock-search-error',
    });
    console.error('Error fetching stocks:', data);
  }
  return (
    <section className={classes.container}>
      <header>
        <Input
          prefix={<SearchOutlined />}
          onChange={(e) => {
            if (e.target.value.length >= 2) {
              setQuery(e.target.value);
            }
          }}
          placeholder="Search Stocks (enter at least 2 characters)"
        />
      </header>
      <main>
        {query === '' ? (
          <p>The Searched Stocks Will Appear Here</p>
        ) : status === 'pending' ? (
          loader
        ) : (
          status === 'success' &&
          data.map((stock: SingleStock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))
        )}
      </main>
    </section>
  );
};
