import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';

import healthRouter from './routes/health.routes.js'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import customerRouter from './routes/customer.routes.js';
import taskRouter from './routes/task.routes.js';

import errorHandler from './middlewares/error.middleware.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('<h1>Hello, Express.js Server!</h1>');
});

// test health
app.use('/health', healthRouter);

// All routes
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);
app.use('/api/tasks', taskRouter);

// error handler
app.use(errorHandler);

export default app;
