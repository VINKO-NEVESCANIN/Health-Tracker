import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!password) return res.status(400).json({ error: "password requerido" });
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({ data: {
     firstName,
     lastName,
     email,
     password: hashedPassword,
     role: role || "user",
     } });
  res.json(user);
};

export const getUsers = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;
    const search = (req.query.search as string) || "";

    const users = await prisma.user.findMany({  
      where: {
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

export const getUserByDoctorId = async (req: Request, res: Response) => {
  try {
    const doctorId = Number(req.params.doctorId);
    const user = await prisma.user.findMany({
      where: { doctorId },
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

    console.log("Body recibido en updateInfo:", req.body);

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        birthdate: new Date(req.body.birthdate),
        firstCrisisDate: new Date(req.body.firstCrisisDate),
        epilepsyType: req.body.epilepsyType,
        anxiety: req.body.anxiety === true || req.body.anxiety === "true",
        migraine: req.body.migraine === true || req.body.migraine === "true",
        addictions: req.body.addictions === true || req.body.addictions === "true",
        hypertension: req.body.hypertension === true || req.body.hypertension === "true",
        cogniDisorder: req.body.cogniDisorder === true || req.body.cogniDisorder === "true",
        respiDisorder: req.body.respiDisorder === true || req.body.respiDisorder === "true",
        firstTime: req.body.firstTime === true || req.body.firstTime === "true",

      };

       console.log("Data que se manda a Prisma:", data);

      const user = await prisma.user.update({
      where: { id },
      data,
    });
    
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
