import { Response, NextFunction } from 'express';
import { UserDto } from './user.dto';
import { generateTokens, saveRefreshToken } from '../token/token.service';
import { createUser, getUserByEmail } from './user.service';
import { ApiError } from '../error/api.error';
import { IRequest, IUser } from './types';

const generateAndSendTokens = async (
  req: IRequest<{ email: string; password: string }>,
  res: Response,
  next: NextFunction,
  user: IUser,
) => {
  const userDto = UserDto(user);
  const { accessToken, refreshToken } = generateTokens({ ...userDto });
  await saveRefreshToken(user.id, refreshToken);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return res.json({ refreshToken, accessToken, user: { ...userDto } });
};

export const register = async (
  req: IRequest<{ email: string; password: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const candidate = await getUserByEmail(email);
  if (candidate) {
    return next(ApiError.internal('User with such email already exists'));
  }

  await createUser(email, password);

  const user = await getUserByEmail(email);
  if (!user) {
    return next(ApiError.internal('Error during registration'));
  }

  await generateAndSendTokens(req, res, next, user);
};

export const login = async (req: IRequest<{ email: string; password: string }>, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return next(ApiError.badRequest('No user with such email'));
  }
  if (password !== user.password) {
    return next(ApiError.badRequest('Wrong password'));
  }

  await generateAndSendTokens(req, res, next, user);
};
