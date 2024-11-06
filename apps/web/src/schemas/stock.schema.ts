import { z } from 'zod';
import { customValidations } from '../utils/zod.utils';

export const PageStockSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  price: z.number(),
  changesPercentage: z.number(),
  change: z.number(),
  dayLow: z.number(),
  dayHigh: z.number(),
  yearHigh: z.number(),
  yearLow: z.number(),
  marketCap: z.number(),
  priceAvg50: z.number(),
  priceAvg200: z.number(),
  exchange: z.string(),
  volume: z.number(),
  avgVolume: z.number(),
  open: z.number(),
  previousClose: z.number(),
  eps: z.number(),
  pe: z.number(),
  earningsAnnouncement: customValidations.date,
  sharesOutstanding: z.number(),
  timestamp: z.number(),
});

export const SingleStockSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  currency: z.string(),
  stockExchange: z.string(),
  exchangeShortName: z.string(),
});

export type PageStock = z.infer<typeof PageStockSchema>;
export type SingleStock = z.infer<typeof SingleStockSchema>;
