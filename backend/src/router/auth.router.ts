import express from 'express';
import { authLoginPost, authValidatePost } from '../controller/auth.controller';
export const authRouter = express.Router();

authRouter.post('/login', authLoginPost);
authRouter.post('/validate', authValidatePost);
