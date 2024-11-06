import { z } from 'zod';

export const EnvSchema = z.object({
  VITE_BACKEND_URL: z.string(),
  VITE_STOCK_API_TOKEN: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
