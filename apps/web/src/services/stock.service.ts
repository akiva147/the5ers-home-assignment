import axios from 'axios';
import { PageStock, SingleStock } from '../schemas/stock.schema';
import { validateEnvs } from '../utils/env.utils';

const { VITE_STOCK_API_TOKEN } = validateEnvs();

const STOCK_API_URL = 'https://financialmodelingprep.com/api/v3/';

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

      return response.data;
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

      return response.data;
    } catch (error) {
      console.error('Error during stock fetching', error);
      throw new Error('Failed to stock fetching');
    }
  }
}

export const stockService = new StockService();
