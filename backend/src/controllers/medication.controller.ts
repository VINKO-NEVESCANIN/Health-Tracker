import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear medicación general
export const createMedication = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ error: "name requerido" });

    const med = await prisma.medication.create({
      data: { name, description }
    });

    res.status(201).json(med);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando medicamento" });
  }
};

// Lista de medicamentos disponibles
export const listMedications = async (req: Request, res: Response) => {
  try {
    const meds = await prisma.medication.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(meds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo medicamentos" });
  }
};

// Asignar medicamento a un paciente
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
        endDate: endDate ? new Date(endDate) : undefined
      }
    });

    res.status(201).json(assigned);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error asignando medicamento" });
  }
};

// Medicamentos asignados a un paciente
export const listPatientMedications = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);

    const meds = await prisma.patientMedication.findMany({
      where: { patientId },
      include: { medication: true }
    });

    res.json(meds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo medicamentos del paciente" });
  }
};
