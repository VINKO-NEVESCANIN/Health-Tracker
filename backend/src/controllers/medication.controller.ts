// src/controllers/medication.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createMedication = async (req: Request, res: Response) => {
  try {
    const { name, type, abbreviation } = req.body;
    if (!name) return res.status(400).json({ error: "name requerido" });

    const med = await prisma.medication.create({
      data: {
        name,
        type,
        abbreviation,
      }
    });
    res.status(201).json(med);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando medicamento" });
  }
};

export const getMedications = async (_req: Request, res: Response) => {
  try {
    const meds = await prisma.medication.findMany({ orderBy: { name: "asc" } });
    res.json(meds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo medicamentos" });
  }
};

export const getMedication = async (req: Request, res: Response) => {
  try {
    const med = await prisma.medication.findUnique({ where: { id: Number(req.params.id) } });
    if (!med) return res.status(404).json({ error: "Medication not found" });
    res.json(med);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo medicamento" });
  }
};

export const updateMedication = async (req: Request, res: Response) => {
  try {
    const med = await prisma.medication.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(med);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando medicamento" });
  }
};

export const deleteMedication = async (req: Request, res: Response) => {
  try {
    await prisma.medication.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando medicamento" });
  }
};
