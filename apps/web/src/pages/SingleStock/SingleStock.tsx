import { useParams } from 'react-router-dom';
import classes from './single-stock.module.scss';
import { useMutation, useQuery } from '@tanstack/react-query';
import { stockService } from '../../services/stock.service';
import { Button, message } from 'antd';
import { loader } from '../../constants/general';

export interface SingleStockProps {}

export const SingleStock = (props: SingleStockProps) => {
  const { symbol } = useParams();
  if (!symbol) throw new Error('Symbol is undefined');
  const { data, status } = useQuery({
    enabled: Boolean(symbol),
    queryKey: ['stocks', symbol],
    queryFn: async () => await stockService.getStockBySymbol(symbol),
  });

  const addStock = useMutation({
    mutationFn: async (symbol) => {
      if (!data) throw new Error('Stock data is undefined');
      return await stockService.addStock({
        name: data.name,
        symbol: data.symbol,
      });
    },
    onSuccess: () => {
      message.success({
        content: 'Stock added successfully!',
        key: 'single-stock-add',
      });
    },
    onError: (error) => {
      message.error({
        content: 'Failed to add stock. Please try again later.',
        key: 'single-stock-add-error',
      });
      console.error('Error adding stock:', error);
    },
  });
  // uncomment to debug
  // console.log('🚀 ~ SingleStock ~ data:', data);

  if (status === 'error') {
    message.error({
      content: 'Failed to fetch stock. Please try again later.',
      key: 'single-stock-error',
    });
    console.error('Error fetching stocks:', data);
  }

  return (
    <div className={classes.container}>
      {status === 'pending'
        ? loader
        : status === 'success' && (
            <div className={classes.card}>
              <header>
                <h3>{data.name}</h3>
              </header>
              <main>
                <span>symbol: {data.symbol}</span>
                <span>avgVolume: {data.avgVolume}</span>
                <span>change: {data.change}</span>
                <span>changesPercentage: {data.changesPercentage}%</span>
                <span>dayHigh: {data.dayHigh}</span>
                <span>dayLow: {data.dayLow}</span>
                <span>
                  earningsAnnouncement: {String(data.earningsAnnouncement)}
                </span>
                <span>eps: {data.eps}</span>
                <span>exchange: {data.exchange}</span>
                <span>marketCap: {data.marketCap}</span>
                <span>open: {data.open}</span>
                <span>pe: {data.pe}</span>
                <span>previousClose: {data.previousClose}</span>
                <span>price: {data.price}</span>
                <span>priceAvg200: {data.priceAvg200}</span>
                <span>priceAvg50: {data.priceAvg50}</span>
                <span>sharesOutstanding: {data.sharesOutstanding}</span>
                <span>timestamp: {data.timestamp}</span>
                <span>volume: {data.volume}</span>
                <span>yearHigh: {data.yearHigh}</span>
                <span>yearLow: {data.yearLow}</span>
              </main>
              <footer>
                {/* // TODO: add functionallity */}
                <Button type="primary">Add To List</Button>
              </footer>
            </div>
          )}
    </div>
  );
};
