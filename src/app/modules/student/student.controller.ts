/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student-service';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'student retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
