// src/controllers/crisis.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createCrisis = async (req: Request, res: Response) => {
  try {
    const { patientId, date, durationMin, intensity, notes } = req.body;
    if (!patientId) return res.status(400).json({ error: "patientId requerido" });

    const crisis = await prisma.crisis.create({
      data: {
        patientId: Number(patientId),
        date: date ? new Date(date) : undefined,
        durationMin: durationMin ?? null,
        intensity: intensity ?? null,
        notes: notes ?? null,
      },
    });

    res.status(201).json(crisis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registrando crisis" });
  }
};
