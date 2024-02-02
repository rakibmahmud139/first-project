import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import { offeredCourseControllers } from './offeredCourse.controller';
import auth from '../../middleware/authMiddleware';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-offeredCourse',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validatedRequest(
    offeredCourseValidations.createOfferedCourseCourseValidationSchema,
  ),
  offeredCourseControllers.createOfferedCourse,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  offeredCourseControllers.getAllOfferedCourses,
);

router.get(
  '/my-offered-courses',
  auth(USER_ROLE.student),
  offeredCourseControllers.getMyOfferedCourses,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  offeredCourseControllers.getSingleOfferedCourses,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validatedRequest(
    offeredCourseValidations.updateOfferedCourseCourseValidationSchema,
  ),
  offeredCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  offeredCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;
