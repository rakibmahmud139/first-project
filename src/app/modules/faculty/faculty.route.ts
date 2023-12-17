import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validatedRequest from '../../middleware/validateRequest';
import auth from '../../middleware/authMiddleware';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validatedRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
