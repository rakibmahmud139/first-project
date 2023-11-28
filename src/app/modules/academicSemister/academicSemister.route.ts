import express from 'express';
import { AcademicSemesterControllers } from './acdemicSemester.controller';
import validatedRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validatedRequest(
    AcademicSemesterValidations.createAcademicSemesterValidation,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

// router.get('/', StudentControllers.getAllStudent);

// router.get('/:studentId', StudentControllers.getSingleStudent);

// router.delete('/:studentId', StudentControllers.deleteStudent);

export const AcademicSemesterRoutes = router;
