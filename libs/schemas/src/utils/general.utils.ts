import { z } from 'zod';

export const customValidations = {
  dateSrinng: z.preprocess(
    (arg) => (typeof arg === 'string' ? new Date(arg) : undefined),
    z.date()
  ),
};
