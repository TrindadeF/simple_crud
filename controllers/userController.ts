import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const criarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userExistente = await prisma.user.findUnique({ where: { email } });
    if (userExistente) {
      res.status(400).json({ error: "E-mail já cadastrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const novoUsuario = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: novoUsuario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o usuário" });
  }
};
export const listarUsuarios = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarios = await prisma.user.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

export const obterUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const usuario = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!usuario) {
      res.status(404).json({ error: "Usuário não encontrado" });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter o usuário" });
  }
};

export const atualizarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const usuarioExistente = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!usuarioExistente) {
      res.status(404).json({ error: "Usuário não encontrado" });
      return;
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const usuarioAtualizado = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        password: hashedPassword || usuarioExistente.password,
      },
    });

    res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: usuarioAtualizado,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }
};
export const deletarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o usuário" });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    const token = generateToken(user.id);

    res.json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    next(error);
  }
};
