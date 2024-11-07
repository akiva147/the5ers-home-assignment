import { TokenUser } from '@the5ers-home-assignment/schemas';
import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  user?: TokenUser;
}
