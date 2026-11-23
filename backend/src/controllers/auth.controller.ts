// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import { hashPassword, comparePassword } from "../utils/hash";

import { JWT_SECRET, ALLOW_ROLE_SIGNUP } from "../config/env";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, email, password, role } = req.body;
    if (!firstName || !email || !password) return res.status(400).json({ error: "Faltan datos" });
    if (String(password).length < 8) return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "Email ya registrado" });

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      // El registro público siempre crea pacientes. Los doctores se crean con `npm run create-user`.
      data: { firstName, email, password: hashed, role: ALLOW_ROLE_SIGNUP && role ? role : "Paciente" },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, firstName: user.firstName, email: user.email, role: user.role, firstTime: user.firstTime }, token });
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
    res.json({ user: { id: user.id, firstName: user.firstName, 
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