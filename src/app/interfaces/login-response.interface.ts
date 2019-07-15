import { UserModel } from '../models/user.model';

export interface LoginResponseInterface {
  token: string;
  user: UserModel;
}
