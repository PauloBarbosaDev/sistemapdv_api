import express from 'express';
import cors from 'cors';
import { router } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', swaggerUI.setup(swaggerDocument));
app.use(swaggerUI.serve);

app.use(router);

export { app };
