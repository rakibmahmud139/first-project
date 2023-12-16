import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

export const offeredCourseControllers = {
  createOfferedCourse,
};
