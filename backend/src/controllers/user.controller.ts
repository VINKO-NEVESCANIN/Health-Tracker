import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role, doctorId } = req.body;

  if (!password) return res.status(400).json({ error: "password requerido" });
  if (!email) return res.status(400).json({ error: "email requerido" });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Ese correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: {
       firstName,
       lastName,
       email,
       password: hashedPassword,
       role: role || "user",
       doctorId: doctorId ? Number(doctorId) : undefined,
       } });
    res.json(user);
  } catch (err: any) {
    console.error("Error creando usuario:", err);
    res.status(500).json({ error: "No se pudo crear el usuario", detail: err.message });
  }
};

export const getUsers = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;
    const search = (req.query.search as string) || "";
    const role = req.query.role as string | undefined;

    const users = await prisma.user.findMany({
      where: {
        ...(role ? { role } : {}),
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};


export const getUserById = async (req: Request, res: Response) => {
try{  
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      appointments: true,
      crisis: true,
      medications: { include: { medication: true } },
      studies: true
    }
  });
  res.json(user);
} catch (err) {
  console.error(err);
  res.status(500).json({ error: "Error obteniendo usuario" });
}
};

export const updateAccess = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: {
      firstName,
      lastName,
      email,
      password: password ? await bcrypt.hash(password, 10) : undefined,
      role: role || "user",
    },
  });
  res.json(user);
};

export const updateInfo = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const b = req.body;
    const bool = (v: any) => v === true || v === "true";
    const date = (v: any) => (v ? new Date(v) : undefined);

    const birthdate = date(b.birthdate);
    const age =
      birthdate && !isNaN(birthdate.getTime())
        ? Math.floor((Date.now() - birthdate.getTime()) / (365.25 * 24 * 3600 * 1000))
        : undefined;

    const data: any = {
      firstName: b.firstName,
      lastName: b.lastName,
      gender: b.gender,
      height: b.height != null ? String(b.height) : undefined,
      weight: b.weight != null ? String(b.weight) : undefined,
      birthdate,
      age,
      firstCrisisDate: date(b.firstCrisisDate),
      epilepsyType: b.epilepsyType,
      anxiety: b.anxiety !== undefined ? bool(b.anxiety) : undefined,
      migraine: b.migraine !== undefined ? bool(b.migraine) : undefined,
      addictions: b.addictions !== undefined ? bool(b.addictions) : undefined,
      hypertension: b.hypertension !== undefined ? bool(b.hypertension) : undefined,
      cogniDisorder: b.cogniDisorder !== undefined ? bool(b.cogniDisorder) : undefined,
      respiDisorder: b.respiDisorder !== undefined ? bool(b.respiDisorder) : undefined,
      // Al guardar el perfil por primera vez ya no es "primer ingreso"
      firstTime: false,
    };

    const user = await prisma.user.update({ where: { id }, data });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Usuario eliminado" });
};