import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import auth from '../../middleware/authMiddleware';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validatedRequest(
    AcademicDepartmentValidations.CreateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartmentIntoDb,
);

route.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

route.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartmentIntoDb,
);

route.patch(
  '/:departmentId',
  validatedRequest(
    AcademicDepartmentValidations.UpdateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartmentIntoDb,
);

export const AcademicDepartmentRoutes = route;
