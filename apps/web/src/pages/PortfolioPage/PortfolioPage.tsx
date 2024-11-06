import { useQuery } from '@tanstack/react-query';
import classes from './portfolio-page.module.scss';
import { stockService } from '../../services/stock.service';
import { useState } from 'react';
import { Input } from 'antd';
import { getUser } from '../../utils/general.utils';

export interface PortfolioPageProps {}

export const PortfolioPage = (props: PortfolioPageProps) => {
  const user = getUser();
  const [query, setQuery] = useState('');
  const { data } = useQuery({
    queryKey: ['stocks'],
    queryFn: async () => await stockService.getStocks(query),
  });

  // console.log('🚀 ~ PortfolioPage ~ data:', data);
  return (
    <div className={classes.container}>
      <header>
        <h2>hey {user.email}, your stock portfolio</h2>
      </header>
      <Input />
    </div>
  );
};
