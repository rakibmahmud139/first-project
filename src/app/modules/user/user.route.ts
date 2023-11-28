import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validatedRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validatedRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRouter = router;
