import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../api/error/api.error';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.message);
  }
  return res.status(500).json('Internal error');
};
