import {
  PageStock,
  PageStockSchema,
  SingleStock,
  SingleStockSchema,
  UserStock,
} from '@the5ers-home-assignment/schemas';
import axios from 'axios';
import { validateEnvs } from '../utils/env.utils';
import { authInstance } from './index.service';

const { VITE_STOCK_API_TOKEN } = validateEnvs();

const STOCK_API_URL = 'https://financialmodelingprep.com/api/v3/';

const PREFIX = '/stock';

class StockService {
  async getStocks(query: string, limit = 10): Promise<SingleStock[]> {
    const typeOfSearch = 'search';

    try {
      const response = await axios.get(`${STOCK_API_URL}/${typeOfSearch}`, {
        params: {
          query,
          apikey: VITE_STOCK_API_TOKEN,
          limit,
        },
      });
      const data = SingleStockSchema.array().parse(response.data);
      return data;
    } catch (error) {
      console.error('Error during stock fetching', error);
      throw new Error('Failed to stock fetching');
    }
  }
  async getStockBySymbol(symbol: string): Promise<PageStock> {
    const typeOfSearch = 'quote';

    try {
      const response = await axios.get(
        `${STOCK_API_URL}/${typeOfSearch}/${symbol}`,
        {
          params: {
            query: 'AA',
            apikey: VITE_STOCK_API_TOKEN,
          },
        }
      );
      const data = PageStockSchema.parse(response.data[0]);
      return data;
    } catch (error) {
      console.error('Error during stock fetching', error);
      throw new Error('Failed to stock fetching');
    }
  }

  async addStock(stock: UserStock) {
    try {
      await authInstance.post(`${PREFIX}`, {
        stock,
      });
    } catch (error) {
      console.error('Error during signup', error);
      throw new Error('Failed to signup');
    }
  }
}

export const stockService = new StockService();
