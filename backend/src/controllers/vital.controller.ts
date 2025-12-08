import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createVital = async (req: Request, res: Response) => {
  try {
    const { patientId, heartRate, oxygen, temperature, notes } = req.body;
    const vital = await prisma.vital.create({
      data: { patientId, heartRate, oxygen, temperature, notes },
    });
    res.status(201).json(vital);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error creando vital" });
  }
};

export const listVitals = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);
    const vitals = await prisma.vital.findMany({ where: { patientId }, orderBy: { date: "desc" } });
    res.json(vitals);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo vitals" });
  }
};
