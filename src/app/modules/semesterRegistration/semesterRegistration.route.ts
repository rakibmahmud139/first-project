import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import auth from '../../middleware/authMiddleware';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-semesterRegistration',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validatedRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationControllers.getAllSemesterRegistration,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validatedRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
