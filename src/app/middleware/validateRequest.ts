import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validatedRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    return next();
  });
};

export default validatedRequest;
