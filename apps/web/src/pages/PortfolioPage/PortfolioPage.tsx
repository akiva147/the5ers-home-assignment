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
  const fisrtName = user.fullName.split(' ')[0];
  const { data } = useQuery({
    queryKey: ['stocks'],
    queryFn: async () => await stockService.getStocks(query),
  });

  // console.log('🚀 ~ PortfolioPage ~ data:', data);
  return (
    <div className={classes.container}>
      <header>
        <h2>Welcome {fisrtName}! here is your stock portfolio</h2>
      </header>
      <Input />
    </div>
  );
};
