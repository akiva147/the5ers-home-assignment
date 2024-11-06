import { SingleStock } from '@the5ers-home-assignment/schemas';
import classes from './stock-list.module.scss';

export interface StockListProps {}

// TODO: Fetch and display stocks of the user

export const StockList = (props: StockListProps) => {
  return (
    <section className={classes.container}>
      <header>
        <h4>Stock List</h4>
      </header>
      <main>
        <ul>
          <li></li>
        </ul>
      </main>
    </section>
  );
};
