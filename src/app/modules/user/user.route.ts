import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validatedRequest from '../../middleware/validateRequest';
import { facultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validatedRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validatedRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validatedRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRouter = router;
