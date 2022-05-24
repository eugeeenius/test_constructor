import { Request } from 'express';

export interface IUserDto {
  id: number;
  email: string;
}

export interface IUser extends IUserDto{
  password: string;
}

export interface IRequest<T> extends Request {
  body: T;
}
