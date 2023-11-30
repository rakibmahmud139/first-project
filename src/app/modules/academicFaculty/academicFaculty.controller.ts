import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createAcademicFacultyIntoDb = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesIntoDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicFacultyIntoDb = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyIntoDb(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  });
});

const updateAcademicFacultyIntoDb = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFacultyIntoDb,
  getAllAcademicFaculty,
  getSingleAcademicFacultyIntoDb,
  updateAcademicFacultyIntoDb,
};
