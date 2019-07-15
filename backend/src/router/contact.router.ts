import express from 'express';
import { contactPost } from '../controller/contact.controller';
export const contactRouter = express.Router();

contactRouter.post('', contactPost);
