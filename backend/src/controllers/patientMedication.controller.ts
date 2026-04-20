// src/controllers/patientMedication.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createPatientMedication = async (req: Request, res: Response) => {
  try {
    const { patientId, medicationId, dose, interval, name, presentation } = req.body;
    if (!patientId || !medicationId) return res.status(400).json({ error: "patientId y medicationId requeridos" });

    const pm = await prisma.patientMedication.create({
      data: {
        patientId: Number(patientId),
        medicationId: Number(medicationId),
        name: name ?? null,
        dose: dose ?? null,
        interval: interval ?? null,
        presentation: presentation ?? null,
      },
    });

    res.status(201).json(pm);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error asignando medicamento" });
  }
};

export const getPatientMedications = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.patientId);
    if (!patientId) return res.status(400).json({ error: "patientId requerido" });

    const items = await prisma.patientMedication.findMany({
      where: { patientId },
      include: { medication: true }
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo medicamentos del paciente" });
  }
};

export const deletePatientMedication = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.patientMedication.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando patient medication" });
  }
};
