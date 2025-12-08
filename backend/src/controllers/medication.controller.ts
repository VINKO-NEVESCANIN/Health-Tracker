import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createMedication = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "name requerido" });
    const med = await prisma.medication.create({ data: { name, description } });
    res.status(201).json(med);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error creando medicamento" });
  }
};

export const listMedications = async (_req: Request, res: Response) => {
  try {
    const meds = await prisma.medication.findMany({ orderBy: { createdAt: "desc" } });
    res.json(meds);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo medicamentos" });
  }
};

export const assignMedication = async (req: Request, res: Response) => {
  try {
    const { patientId, medicationId, dose, interval, startDate, endDate } = req.body;
    const assigned = await prisma.patientMedication.create({
      data: {
        patientId,
        medicationId,
        dose,
        interval,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });
    res.status(201).json(assigned);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error asignando medicamento" });
  }
};

export const listPatientMedications = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);
    const meds = await prisma.patientMedication.findMany({ where: { patientId }, include: { medication: true } });
    res.json(meds);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo medicamentos del paciente" });
  }
};
