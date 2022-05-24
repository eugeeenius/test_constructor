import { execute } from '../../mysql.connector';
import UserQueries from './user.queries';
import { IUser } from './types';
import { ResultSetHeader } from 'mysql2';

export const createUser = async (email: IUser['email'], password: IUser['password']): Promise<boolean> => {
  const res = await execute<ResultSetHeader>(UserQueries.AddUser, [email, password]);
  return res.affectedRows > 0;
};

export const getUserByEmail = async (email: IUser['email']): Promise<IUser | undefined> => {
  return (await execute<IUser[]>(UserQueries.GetUserByEmail, [email]))[0];
};

export const getUserById = async (id: IUser['id']): Promise<IUser | undefined> => {
  return (await execute<IUser[]>(UserQueries.GetUserById, [id]))[0];
};
