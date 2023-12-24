import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { enrolledCourseControllers } from './enrolledCourse.controller';
import { enrolledCourseValidations } from './enrolledCourse.validation';
import auth from '../../middleware/authMiddleware';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validatedRequest(
    enrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  enrolledCourseControllers.createEnrolledCourse,
);

export const EnrolledCourseRouter = router;
