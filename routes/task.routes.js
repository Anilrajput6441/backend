import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import role from '../middlewares/role.middleware.js';
import { validateDto } from '../middlewares/validate.middleware.js';
import { CreateTaskDto } from '../dtos/create-task.dto.js';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto.js';
import * as taskController from '../controllers/task.controller.js';

const router = express.Router();

router.use(auth);


router.post(
  '/',
  role(['ADMIN']),
  validateDto(CreateTaskDto),
  taskController.createTask
);


router.get(
  '/',
  role(['ADMIN', 'EMPLOYEE']),
  taskController.getTasks
);


router.patch(
  '/:id/status',
  role(['ADMIN', 'EMPLOYEE']),
  validateDto(UpdateTaskStatusDto),
  taskController.updateTaskStatus
);

export default router;
