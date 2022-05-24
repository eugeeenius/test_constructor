import { IUser } from '../user/types';
import { Request } from 'express';

export interface ITokenData {
  userId: IUser['id'];
  token: string;
}

export interface IAuthMiddlewareRequest extends Request {
  user: any
}
