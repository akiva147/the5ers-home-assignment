import { SingleStock } from '@the5ers-home-assignment/schemas';
import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { userService } from '../../services/user.service';

class StockStore {
  stocks: SingleStock[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch stocks
  async fetchStocks() {
    this.isLoading = true;
    try {
      this.stocks = await userService.getStocks();
      this.error = null;
    } catch (e) {
      this.error = 'Failed to fetch stocks. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  // Delete stock
  async deleteStock(symbol: string | undefined) {
    try {
      if (!symbol) throw new Error('Symbol is undefined');
      await userService.deleteStock(symbol);
      this.stocks = this.stocks.filter((stock) => stock.symbol !== symbol);
      message.success('Stock deleted successfully.');
    } catch (e) {
      message.error('Failed to delete stock. Please try again later.');
    }
  }

  // Set query for search
  setQuery(query: string) {
    // Logic for query handling, like filtering stocks by name/symbol
  }
}

// Create the store
export const stockStore = new StockStore();
