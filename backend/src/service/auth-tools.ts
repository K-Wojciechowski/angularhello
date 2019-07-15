import { StatusMessageModel } from '../models/status-message.model';
import { User } from './db-mysql';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config';

export function authMiddleware() {
  return async (req: any, res: any, next: any) => {
    const authHeader = req.header('Authorization');
    if (authHeader === null || authHeader === undefined) {
      next();
      return;
    }
    const token: string = authHeader.split(' ', 2)[1];
    req.token = token;
    const payload: any = jwt.verify(token, CONFIG.tokenKey);
    const userDB: User = await User.findOne({
      where:
        {id: payload.id, name: payload.name, isAdmin: payload.isAdmin}
    });
    if (userDB == null) {
      req.user = null;
      req.userDB = null;
    } else {
      req.user = userDB.toWebModel();
      req.userDB = userDB;
    }
    next();
  };
}

export function checkLogin(req: any, res: any): boolean {
  if (req.user === null || req.user === undefined) {
    res.status(401).json(new StatusMessageModel(false, 'Unauthorized'));
    return false;
  }
  return true;
}

export function checkAdmin(req: any, res: any): boolean {
  if (req.user === null || req.user === undefined) {
    res.status(401).json(new StatusMessageModel(false, 'Unauthorized'));
    return false;
  }
  if (!req.user.isAdmin) {
    res.status(401).json(new StatusMessageModel(false, 'Not an admin'));
  }
  return req.user.isAdmin;
}
