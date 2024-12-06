import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        error: "Erro de validação",
        detalhes: error.details.map((detail) => detail.message),
      });
      return;
    }
    next();
  };
};
