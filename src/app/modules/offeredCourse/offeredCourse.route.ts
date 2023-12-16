import express from 'express';
import validatedRequest from '../../middleware/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import { offeredCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offeredCourse',
  validatedRequest(
    offeredCourseValidations.createOfferedCourseCourseValidationSchema,
  ),
  offeredCourseControllers.createOfferedCourse,
);

router.get('/', offeredCourseControllers.getAllOfferedCourses);

router.get('/:id', offeredCourseControllers.getSingleOfferedCourses);

router.patch(
  '/:id',
  validatedRequest(
    offeredCourseValidations.updateOfferedCourseCourseValidationSchema,
  ),
  offeredCourseControllers.updateOfferedCourse,
);

router.delete('/:id', offeredCourseControllers.deleteOfferedCourseFromDB);

export const offeredCourseRoutes = router;
