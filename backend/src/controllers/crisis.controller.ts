import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCrisis = async (req: Request, res: Response) => {
  try {
    const { patientId, intensity, durationMin, notes } = req.body;

    const crisis = await prisma.crisis.create({
      data: {
        patientId,
        intensity,
        durationMin,
        notes
      }
    });

    res.status(201).json(crisis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando crisis" });
  }
};

export const listCrisis = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);

    const crisis = await prisma.crisis.findMany({
      where: { patientId },
      orderBy: { date: "desc" }
    });

    res.json(crisis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo crisis" });
  }
};
