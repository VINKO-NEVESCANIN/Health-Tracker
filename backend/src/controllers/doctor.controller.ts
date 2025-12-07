import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener perfil del doctor autenticado
export const getDoctorProfile = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;

    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    if (!doctor) return res.status(404).json({ error: "Doctor no encontrado" });

    res.json({ doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo doctor" });
  }
};

// Listar pacientes del doctor
export const getDoctorPatients = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;

    const patients = await prisma.patient.findMany({
      where: { doctorId },
      orderBy: { createdAt: "desc" }
    });

    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo pacientes del doctor" });
  }
};
