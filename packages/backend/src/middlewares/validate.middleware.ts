import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'バリデーションエラー',
      errors: errors.array().map((error: ValidationError) => ({
        field: error.type === 'field' ? error.path : error.type,
        message: error.msg,
      })),
    });
  }
  next();
}; 