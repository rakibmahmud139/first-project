/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Student } from '../student/student.model';
import { EnrolledCourse } from './enrolledCourse.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * step 1: check if the offered course is exists;
   * step 2: check if the student already enrolled;
   * step 3: create an enrolled course
   */
  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  if (isOfferedCourseExists.maxCapacity < 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full');
  }

  const student = await Student.findOne({ id: userId }, { id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled!');
  }

  // Check total credits exceeds maxCredit

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists?.academicSemester,
  ).select('maxCredit');

  //  total enrolled credits + new enrolled course credits > maxCredit
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists?.semesterRegistration,
        student: student._id,
      },
    },
  ]);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create([
      {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        academicSemester: isOfferedCourseExists.academicSemester,
        academicFaculty: isOfferedCourseExists.academicFaculty,
        academicDepartment: isOfferedCourseExists.academicDepartment,
        offeredCourse: offeredCourse,
        course: isOfferedCourseExists.course,
        student: student?._id,
        faculty: isOfferedCourseExists.faculty,
        isEnrolled: true,
      },
    ]);

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You can not enrolled this course',
      );
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;

    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });
    session.commitTransaction();
    session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();

    await session.endSession();

    throw new Error(error);
  }
};

export const enrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
