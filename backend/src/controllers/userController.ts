import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};
