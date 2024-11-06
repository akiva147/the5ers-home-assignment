import { SingleStock } from '@the5ers-home-assignment/schemas';
import classes from './stock-card.module.scss';
import { Button } from 'antd';

export interface StockCardProps {
  stock: SingleStock;
}

export const StockCard = ({ stock }: StockCardProps) => {
  return (
    <div className={classes.container}>
      <main>
        <h5>Symbol: {stock.symbol}</h5>
        <p>Name: {stock.name}</p>
        <p>Stock Exchange: {stock.stockExchange}</p>
        <p>Currency: {stock.currency}</p>
        <p>Exchange Short Name: {stock.exchangeShortName}</p>
      </main>
      <footer>
        {/* // TODO: Implement view and add to list buttons */}
        <Button type="primary">View Stock</Button>
        <Button className={classes.addButton}>Add To List</Button>
      </footer>
    </div>
  );
};
