import { UserModel } from '../models/user.model';
import { StatusMessageModel } from '../models/status-message.model';
import { checkLogin } from '../service/auth-tools';
import { User } from '../service/db-mysql';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config';

export async function authLoginPost(req: any, res: any) {
  const userDB = await User.findOne({ where: { name: req.body.name } });
  if (userDB == null) {
    res.status(401).json(new StatusMessageModel(false, 'No such user'));
    return;
  }
  const passwordCheck: boolean = await userDB.checkPassword(req.body.password);
  if (!passwordCheck) {
    res.status(401).json(new StatusMessageModel(false, 'Wrong password'));
  } else {
    const user = userDB.toWebModel();
    const token = jwt.sign(userDB.getTokenPayload(), CONFIG.tokenKey);
    res.status(200).json({ token, user });
  }
}

export function authValidatePost(req: any, res: any) {
  if (checkLogin(req, res)) {
    res.status(200).json({ token: req.token, user: req.user });
  }
}
