import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import healthRouter from './routes/health.routes.js'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import customerRouter from './routes/customer.routes.js';
import taskRouter from './routes/task.routes.js';

import errorHandler from './middlewares/error.middleware.js';

// swagger imports
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

dotenv.config();

const app = express();

app.use(cors({origin: '*', credentials: true}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('<h1>Hello, Express.js Server!</h1>');
});

// test health
app.use('/api/health', healthRouter);

// All routes
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);
app.use('/api/tasks', taskRouter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// error handler
app.use(errorHandler);

export default app;
