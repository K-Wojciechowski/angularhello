import express from 'express';
import { inboxGet, inboxDelete } from '../controller/inbox.controller';
export const inboxRouter = express.Router();

inboxRouter.get('', inboxGet);
inboxRouter.delete('', inboxDelete);
