import express, { Express, Request, Response } from "express";
import cors from "cors";

const bodyParser = require('body-parser');

import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const BASE_API_ROUTE = '/api'
const port = 3000;

app.use(BASE_API_ROUTE + '/users',userRouter);
app.use(BASE_API_ROUTE + '/posts',postRouter);

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});
