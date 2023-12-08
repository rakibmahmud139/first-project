import express from 'express';
import { StudentControllers } from './student.controller';
import validatedRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudent);

router.get(
  '/:id',
  validatedRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.getSingleStudent,
);

router.patch('/:id', StudentControllers.updateStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
