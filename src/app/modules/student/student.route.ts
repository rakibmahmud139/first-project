import express from 'express';
import { StudentControllers } from './student.controller';
import validatedRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/', StudentControllers.getAllStudent);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  StudentControllers.getSingleStudent,
);

router.patch(
  '/:id',
  validatedRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
