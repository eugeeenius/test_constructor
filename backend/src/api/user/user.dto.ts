import { IUserDto, IUser } from './types';

export const UserDto = (user: IUser): IUserDto => ({
  id: user.id,
  email: user.email,
});
