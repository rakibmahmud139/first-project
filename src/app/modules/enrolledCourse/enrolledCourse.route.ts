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

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validatedRequest(
    enrolledCourseValidations.updateEnrolledCourseMarksValidationSchema,
  ),
  enrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRouter = router;
