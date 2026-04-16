// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import { hashPassword, comparePassword } from "../utils/hash";

const JWT_SECRET = process.env.JWT_SECRET || "secret_dev";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, email, password, role } = req.body;
    if (!firstName || !email || !password) return res.status(400).json({ error: "Faltan datos" });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "Email ya registrado" });

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { firstName, email, password: hashed, role: role || "Paciente" },
    });

    const token = jwt.sign({ userId: user.id, role: user.role, doctorId: user.doctorId }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, doctorId: user.doctorId, firstName: user.firstName, password: user.password, email: user.email, role: user.role}, token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error en registro" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, doctorId: user.doctorId, firstName: user.firstName, 
    lastName: user.lastName, email: user.email, role: user.role, firstTime: user.firstTime }, token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error en login" });
  }
};

export const me = async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, firstName: true, lastName: true, email: true, role: true },
    });
    res.json({ user });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
};
