/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRouter } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandling';
import notFound from './app/middleware/notFound';
import router from './app/routers/indes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

//global error handling
app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
