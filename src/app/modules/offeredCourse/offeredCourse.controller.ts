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

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourses retrieved successfully !',
    data: result,
  });
});

const getMyOfferedCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await offeredCourseServices.getMyOfferedCoursesFromDB(
    userId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourses retrieved successfully !',
    data: result,
  });
});

const getSingleOfferedCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse fetched successfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await offeredCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course updated successfully',
    data: result,
  });
});

const deleteOfferedCourseFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.deleteOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse deleted successfully',
    data: result,
  });
});

export const offeredCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourses,
  deleteOfferedCourseFromDB,
};
