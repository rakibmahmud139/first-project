import express from 'express';
import { StudentControllers } from './student.controller';
import validatedRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middleware/authMiddleware';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentControllers.getAllStudent,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validatedRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete(
  '/:studentId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
