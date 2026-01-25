// src/controllers/vital.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createVital = async (req: Request, res: Response) => {
  try {
    const { patientId, heartRate, oxygen, temperature, notes, date } = req.body;
    if (!patientId) return res.status(400).json({ error: "patientId requerido" });

    const vital = await prisma.vital.create({
      data: {
        patientId: Number(patientId),
        heartRate: heartRate ?? null,
        oxygen: oxygen ?? null,
        temperature: temperature ?? null,
        notes: notes ?? null,
        date: date ? new Date(date) : undefined,
      },
    });

    res.status(201).json(vital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando vital" });
  }
};

export const getVitals = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.patientId);
    const vitals = await prisma.vital.findMany({ where: { patientId }, orderBy: { date: "desc" } });
    res.json(vitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo vitals" });
  }
};
