import { z } from 'zod';

export const customValidations = {
  date: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
};
