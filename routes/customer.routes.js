import express from 'express';
import { validateDto } from '../middlewares/validate.middleware.js';
import {UpdateCustomerDto} from '../dtos/update-customer.dto.js'
import {CreateCustomerDto} from '../dtos/create-customer.dto.js'
import * as customerController from '../controllers/customer.controller.js';
import role from '../middlewares/role.middleware.js';
import auth from '../middlewares/auth.middleware.js';


const router = express.Router();

router.use(auth);

router.post(
  '/',
  role(['ADMIN']),
  validateDto(CreateCustomerDto),
  customerController.createCustomer
);


router.get(
  '/',
  role(['ADMIN', 'EMPLOYEE']),
  customerController.getCustomers
);

router.get(
  '/:id',
  role(['ADMIN', 'EMPLOYEE']),
  customerController.getCustomerById
);

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