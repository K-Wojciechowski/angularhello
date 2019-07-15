import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { CONFIG } from './config/config';
import { authMiddleware } from './service/auth-tools';
import Router from './router';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(authMiddleware());
app.use(Router);
const port = CONFIG.port;
const hostname = CONFIG.host;

app.listen(port, hostname, () => console.log(`App listening on port ${port}!`));
