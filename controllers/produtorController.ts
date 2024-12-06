import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarProdutor = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  try {
    const produtor = await prisma.produtor.create({
      data: { nome, email, senha },
    });
    res.status(201).json(produtor);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar produtor" });
  }
};

export const listarProdutores = async (_req: Request, res: Response) => {
  const produtores = await prisma.produtor.findMany({
    include: { fazendas: true },
  });
  res.json(produtores);
};

export const obterProdutor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const produtor = await prisma.produtor.findUnique({
      where: { id: Number(id) },
    });

    if (!produtor) {
      res.status(404).json({ error: "Produtor não encontrado" });
      return;
    }

    res.json(produtor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o produtor" });
  }
};
export const atualizarProdutor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const produtor = await prisma.produtor.update({
      where: { id: Number(id) },
      data: { nome, email, senha },
    });

    res.json(produtor);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar produtor" });
  }
};

export const deletarProdutor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.produtor.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar produtor" });
  }
};
