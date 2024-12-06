import { Request, Response, NextFunction } from "express";

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: "O ID deve ser um número válido." });
    return;
  }

  next();
};
