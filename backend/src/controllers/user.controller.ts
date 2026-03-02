import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, createdAt, role } = req.body;

  if (!password) return res.status(400).json({ error: "password requerido" });
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({ data: {
     name, 
     email,
     password: hashedPassword,
     createdAt: createdAt ? new Date(createdAt) : undefined,
     role: role || "user",
     } });
  res.json(user);
};

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

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: {
      name,
      email,
      password: password ? await bcrypt.hash(password, 10) : undefined,
      role: role || "user",
    },
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Usuario eliminado" });
};
