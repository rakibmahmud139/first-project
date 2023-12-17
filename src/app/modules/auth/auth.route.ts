import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { AuthValidations } from './auth.validation';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validatedRequest(AuthValidations.loginValidationSchema),
  authControllers.loginUser,
);

export const authRouter = router;
