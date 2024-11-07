import { useQuery } from '@tanstack/react-query';
import classes from './portfolio-page.module.scss';
import { stockService } from '../../services/stock.service';
import { useState } from 'react';
import { Input } from 'antd';
import { getUser } from '../../utils/general.utils';
import { SearchOutlined } from '@ant-design/icons';
import { StockList } from '../../components/StockList';
import { SearchStocks } from '../../components/SearchStocks';

export interface PortfolioPageProps {}

export const PortfolioPage = (props: PortfolioPageProps) => {
  const user = getUser();

  const fisrtName = user.fullName.split(' ')[0];

  return (
    <div className={classes.container}>
      <header>
        <h2>Welcome {fisrtName}! here is your stock portfolio</h2>
      </header>
      <main>
        <SearchStocks />
        <StockList />
      </main>
    </div>
  );
};
