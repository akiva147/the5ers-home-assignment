import { Env, EnvSchema } from '../schemas/env.schema';

export const validateEnvs = (): Env => {
  const env = process.env;

  const parsed = EnvSchema.safeParse(env);

  if (parsed.error) throw new Error('Error validating environment variables');

  return parsed.data;
};
