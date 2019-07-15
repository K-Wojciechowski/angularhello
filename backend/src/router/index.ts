import express from 'express';

import { authRouter } from './auth.router';
import { inboxRouter } from './inbox.router';
import { contactRouter } from './contact.router';

const Router = express.Router();
Router.get('/', (req, res) => res.send('Hello World!'));
Router.use('/auth', authRouter);
Router.use('/inbox', inboxRouter);
Router.use('/contact', contactRouter);

export default Router;
