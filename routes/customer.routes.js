import express from 'express';
import { validateDto } from '../middlewares/validate.middleware.js';
import {UpdateCustomerDto} from '../dtos/update-customer.dto.js'
import {CreateCustomerDto} from '../dtos/create-customer.dto.js'
import * as customerController from '../controllers/customer.controller.js';
import role from '../middlewares/role.middleware.js';
import auth from '../middlewares/auth.middleware.js';


const router = express.Router();

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create customer (ADMIN only)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created
 */
router.post(
  '/',
  role(['ADMIN']),
  validateDto(CreateCustomerDto),
  customerController.createCustomer
);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get customers (ADMIN & EMPLOYEE)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated customers list
 */
router.get(
  '/',
  role(['ADMIN', 'EMPLOYEE']),
  customerController.getCustomers
);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer found
 *       404:
 *         description: Customer not found
 */
router.get(
  '/:id',
  role(['ADMIN', 'EMPLOYEE']),
  customerController.getCustomerById
);

/**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     summary: Update customer (ADMIN only)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Customer updated
 */
router.patch(
  '/:id',
  role(['ADMIN']),
  validateDto(UpdateCustomerDto),
  customerController.updateCustomer
);


router.delete(
  '/:id',
  role(['ADMIN']),
  customerController.deleteCustomer
);

export default router;