import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academicSemister/academicSemester.model';
import generateStudentId from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password not given use default password
  userData.password = password || (config.default_password as string);

  //find academicSemester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set student role
  userData.role = 'student';

  //set manually generate id
  if (admissionSemester) {
    userData.id = await generateStudentId(admissionSemester);
  }

  //create user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
