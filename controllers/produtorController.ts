import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarProdutor = async (req: Request, res: Response) => {
  const { cpf, cnpj, name } = req.body;

  try {
    const produtor = await prisma.producer.create({
      data: {
        cpf,
        cnpj,
        name,
      },
    });
    res.status(201).json(produtor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produtor." });
  }
};

export const listarProdutores = async (_req: Request, res: Response) => {
  try {
    const produtores = await prisma.producer.findMany();
    res.json(produtores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os produtores." });
  }
};

export const obterProdutor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const produtor = await prisma.producer.findUnique({
      where: { id: Number(id) },
    });

    if (!produtor) {
      res.status(404).json({ error: "Produtor não encontrado." });
      return;
    }

    res.json(produtor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o produtor." });
  }
};

export const atualizarProdutor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cpf, cnpj, name } = req.body;

  try {
    const produtor = await prisma.producer.update({
      where: { id: Number(id) },
      data: {
        cpf,
        cnpj,
        name,
      },
    });

    res.json(produtor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o produtor." });
  }
};

export const deletarProdutor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.producer.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produtor." });
  }
};
