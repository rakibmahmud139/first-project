import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const route = express.Router();

route.post(
  '/create-academic-faculty',
  validatedRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFacultyIntoDb,
);

route.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

route.get(
  '/:facultyId',
  AcademicFacultyControllers.getSingleAcademicFacultyIntoDb,
);

route.patch(
  '/:facultyId',
  validatedRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFacultyIntoDb,
);

export const AcademicFacultyRoutes = route;
