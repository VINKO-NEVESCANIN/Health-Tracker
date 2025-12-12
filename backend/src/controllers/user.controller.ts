import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({ data: req.body });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Usuario eliminado" });
};
