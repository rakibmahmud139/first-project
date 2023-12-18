import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { AuthValidations } from './auth.validation';
import { authControllers } from './auth.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/authMiddleware';

const router = express.Router();

router.post(
  '/login',
  validatedRequest(AuthValidations.loginValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validatedRequest(AuthValidations.passwordChangeValidationSchema),
  authControllers.changePassword,
);

export const authRouter = router;
