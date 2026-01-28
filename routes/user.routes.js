import express from 'express'
import authenticate from '../middlewares/auth.middleware.js'
import roleMiddleware from '../middlewares/role.middleware.js'
import { getAllUsers, getUserById, updateUserRole } from '../controllers/user.controller.js'
import { validateDto } from '../middlewares/validate.middleware.js'
import { UpdateUserRoleDto } from '../dtos/update-user-role.dto.ts'



const router = express.Router();

router.use(authenticate)
router.use(roleMiddleware(['ADMIN'])); // Admin Only

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', validateDto(UpdateUserRoleDto), updateUserRole);

export default router;