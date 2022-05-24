import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { IAuthMiddlewareRequest } from '../api/token/types';
import { ApiError } from '../api/error/api.error';

export const authMiddleware = (req: IAuthMiddlewareRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(ApiError.unauthorized());
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    return next();
  } catch(e) {
    return next(ApiError.unauthorized());
  }
};
