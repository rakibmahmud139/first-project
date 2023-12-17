import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUserIntoDB = async (payload: TLoginUser) => {
  const { id } = payload;
  //checking if the user is exists
  //   const isUserExists = await User.findOne({ id });

  const user = await User.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //checking if the user already deleted!
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User already deleted!');
  }

  //checking if the user blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //   checking if the password is correct(use statics method)
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your password is incorrect');
  }

  //   checking if the password is correct(manually)
  //   const isPasswordMatched = await bcrypt.compare(
  //     payload.password,
  //     isUserExists?.password,
  //   );

  //Access granted: Send access token and refresh token!!

  //create token and send to the client!!

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const authServices = {
  loginUserIntoDB,
};
