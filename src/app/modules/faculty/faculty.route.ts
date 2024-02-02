import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validatedRequest from '../../middleware/validateRequest';
import auth from '../../middleware/authMiddleware';
import { facultyValidations } from './faculty.validation';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validatedRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  FacultyControllers.deleteFaculty,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
