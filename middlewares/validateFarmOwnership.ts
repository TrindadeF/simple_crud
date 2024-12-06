import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const validateFarmOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const farm = await prisma.farm.findUnique({
      where: { id: Number(id) },
      include: { producer: true },
    });

    if (!farm || farm.producer.userId !== userId) {
      res
        .status(403)
        .json({ error: "Você não tem permissão para acessar essa fazenda." });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Erro ao validar acesso à fazenda." });
  }
};
