import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateDto = (DtoClass) => {
  return async (req, res, next) => {
    const dtoInstance = plainToInstance(DtoClass, req.body);

    const errors = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

    req.body = dtoInstance;
    next();
  };
};
