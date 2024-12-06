import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarFazenda = async (req: Request, res: Response) => {
  const {
    name,
    city,
    state,
    hectaresTotalArea,
    agriculturalTotalArea,
    vegetationTotalArea,
    producerId,
  } = req.body;

  try {
    const fazenda = await prisma.farm.create({
      data: {
        name,
        city,
        state,
        hectaresTotalArea,
        agriculturalTotalArea,
        vegetationTotalArea,
        producerId,
      },
    });
    res.status(201).json(fazenda);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a fazenda." });
  }
};
export const listarFazendas = async (req: Request, res: Response) => {
  try {
    const fazendas = await prisma.farm.findMany();
    res.json(fazendas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar as fazendas." });
  }
};
export const obterFazenda = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const fazenda = await prisma.farm.findUnique({
      where: { id: Number(id) },
    });

    if (!fazenda) {
      res.status(404).json({ error: "Fazenda não encontrada." });
      return;
    }

    res.json(fazenda);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar a fazenda." });
  }
};

export const atualizarFazenda = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    city,
    state,
    hectaresTotalArea,
    agriculturalTotalArea,
    vegetationTotalArea,
  } = req.body;

  try {
    const fazenda = await prisma.farm.update({
      where: { id: Number(id) },
      data: {
        name,
        city,
        state,
        hectaresTotalArea,
        agriculturalTotalArea,
        vegetationTotalArea,
      },
    });

    res.json(fazenda);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a fazenda." });
  }
};
export const deletarFazenda = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.farm.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar a fazenda." });
  }
};
