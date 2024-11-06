import { z } from 'zod';

export const EnvSchema = z.object({
  DB_CONNECTION: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
  FRONTEND_URL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
