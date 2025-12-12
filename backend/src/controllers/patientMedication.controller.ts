// src/controllers/patientMedication.controller.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPatientMedication = async (req: any, res: Response) => {
  try {
    const {
      patientId,
      medicationId,
      dose,       // <- usar "dose" (no "dosage")
      interval,
      startDate,
      endDate,
    } = req.body;

    if (!patientId || !medicationId) {
      return res.status(400).json({ error: "patientId y medicationId son requeridos" });
    }

    const pm = await prisma.patientMedication.create({
      data: {
        patientId: Number(patientId),
        medicationId: Number(medicationId),
        dose: dose ?? null,
        interval: interval ?? null,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });

    return res.status(201).json(pm);
  } catch (err: any) {
    console.error("Error creando patientMedication:", err);
    return res.status(500).json({ error: "Error interno al crear patientMedication" });
  }
};

export const getPatientMedications = async (req: any, res: Response) => {
  try {
    const patientId = Number(req.params.patientId);
    if (!patientId) return res.status(400).json({ error: "patientId requerido" });

    const items = await prisma.patientMedication.findMany({
      where: { patientId },
      include: { medication: true },
    });

    return res.json(items);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error obteniendo medicamentos del paciente" });
  }
};

export const deletePatientMedication = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "id requerido" });

    await prisma.patientMedication.delete({ where: { id } });
    return res.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error borrando patientMedication" });
  }
};
