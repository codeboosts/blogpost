import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

interface ValidatedRequest extends Request {
  validatedBody?: any;
}
export function validationMiddleware(classType: any) {
  return async (req: ValidatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const dto = new classType();
    const input = req.body;

    Object.assign(dto, input);
    const errors = await validate(dto);

    if (errors.length) {
      const validationErrors: string[] = [];
      errors.forEach((error) => {
        const propertyErrors = Object.values(error.constraints);
        validationErrors.push(...propertyErrors);
      });

      const errorObject = {
        time: new Date().toISOString(),
        endpoint: req.originalUrl,
        errors: validationErrors,
      };

      return res.status(422).json(errorObject);
    }
    req.validatedBody = dto;
    next();
  };
}