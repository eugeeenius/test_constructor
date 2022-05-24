import { execute } from '../../mysql.connector';
import TokenQueries from './token.queries';
import { IUserDto } from '../user/types';
import { ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken';
import { ITokenData } from './types';

export const generateTokens = (payload: IUserDto) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

  return {
    accessToken,
    refreshToken,
  };
};

export const saveRefreshToken = async (userId: IUserDto['id'], refreshToken: string): Promise<boolean> => {
  const tokenData = await execute<ITokenData[]>(TokenQueries.FindUserToken, userId);
  if (tokenData?.length) {
    const res = await execute<ResultSetHeader>(TokenQueries.UpdateToken, [refreshToken, userId]);
    return res.affectedRows > 0;
  }
  const res = await execute<ResultSetHeader>(TokenQueries.SaveToken, [userId, refreshToken]);
  return res.affectedRows > 0;
};
