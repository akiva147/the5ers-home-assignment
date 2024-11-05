import { z } from 'zod';

export const EnvSchema = z.object({
  VITE_BACKEND_URL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
