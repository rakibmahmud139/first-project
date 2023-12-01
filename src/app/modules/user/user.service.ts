import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academicSemister/academicSemester.model';
import generateStudentId from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password not given use default password
  userData.password = password || (config.default_password as string);

  //find academicSemester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set student role
    userData.role = 'student';

    //set manually generate id
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    }

    //create user{transaction-1}
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //create student{transaction-2}
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student');
    }

    await session.commitTransaction();

    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();

    await session.endSession();

    throw new Error('failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
