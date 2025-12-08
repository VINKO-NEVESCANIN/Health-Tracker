import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createCrisis = async (req: Request, res: Response) => {
  try {
    const { patientId, intensity, durationMin, notes, date } = req.body;
    const crisis = await prisma.crisis.create({
      data: { patientId, intensity, durationMin, notes, date: date ? new Date(date) : undefined },
    });
    res.status(201).json(crisis);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error creando crisis" });
  }
};

export const listCrisis = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);
    const crisis = await prisma.crisis.findMany({ where: { patientId }, orderBy: { date: "desc" } });
    res.json(crisis);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo crisis" });
  }
};
