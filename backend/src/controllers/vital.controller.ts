import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createVital = async (req: Request, res: Response) => {
  try {
    const { patientId, heartRate, oxygen, temperature, notes } = req.body;

    const vital = await prisma.vital.create({
      data: {
        patientId,
        heartRate,
        oxygen,
        temperature,
        notes
      }
    });

    res.status(201).json(vital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando vital" });
  }
};

export const listVitals = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);

    const vitals = await prisma.vital.findMany({
      where: { patientId },
      orderBy: { date: "desc" }
    });

    res.json(vitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo vitals" });
  }
};
