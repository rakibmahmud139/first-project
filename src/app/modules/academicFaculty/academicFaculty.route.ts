import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import auth from '../../middleware/authMiddleware';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
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
