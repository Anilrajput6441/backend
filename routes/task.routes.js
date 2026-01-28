import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import role from '../middlewares/role.middleware.js';
import { validateDto } from '../middlewares/validate.middleware.js';
import { CreateTaskDto } from '../dtos/create-task.dto.js';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto.js';
import * as taskController from '../controllers/task.controller.js';

const router = express.Router();

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create task (ADMIN only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Task created
 */
router.post(
  '/',
  role(['ADMIN']),
  validateDto(CreateTaskDto),
  taskController.createTask
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks (ADMIN sees all, EMPLOYEE sees own)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks list
 */
router.get(
  '/',
  role(['ADMIN', 'EMPLOYEE']),
  taskController.getTasks
);

/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Task status updated
 *       403:
 *         description: Forbidden
 */
router.patch(
  '/:id/status',
  role(['ADMIN', 'EMPLOYEE']),
  validateDto(UpdateTaskStatusDto),
  taskController.updateTaskStatus
);

export default router;
