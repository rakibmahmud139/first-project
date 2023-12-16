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

// router.get('/',);

// router.get(
//   '/:id',
// );

// router.patch(
//   '/:id',
//   validatedRequest(
//     offeredCourseValidations.updateOfferedCourseCourseValidationSchema,
//   ),
//   ,
// );

export const offeredCourseRoutes = router;
