import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { enrolledCourseControllers } from './enrolledCourse.controller';
import { enrolledCourseValidations } from './enrolledCourse.validation';
import auth from '../../middleware/authMiddleware';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validatedRequest(
    enrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  enrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  validatedRequest(
    enrolledCourseValidations.updateEnrolledCourseMarksValidationSchema,
  ),
  enrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRouter = router;
