import { SingleStock } from '@the5ers-home-assignment/schemas';
import classes from './stock-card.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface StockCardProps {
  stock: SingleStock;
}

export const StockCard = ({
  stock: { currency, exchangeShortName, name, stockExchange, symbol },
}: StockCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <main>
        <h5>Symbol: {symbol}</h5>
        <p>Name: {name}</p>
        <p>Stock Exchange: {stockExchange}</p>
        <p>Currency: {currency}</p>
        <p>Exchange Short Name: {exchangeShortName}</p>
      </main>
      <footer>
        {/* // TODO: Implement view and add to list buttons */}
        <Button type="primary" onClick={() => navigate(`/stock/${symbol}`)}>
          View Stock
        </Button>
        <Button className={classes.addButton}>Add To List</Button>
      </footer>
    </div>
  );
};
