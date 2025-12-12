// src/controllers/crisis.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createCrisis = async (req: Request, res: Response) => {
  try {
    const { patientId, date, duration, intensity, notes } = req.body;

    const crisis = await prisma.crisis.create({
      data: {
        patientId,
        date: new Date(date),
        duration,
        intensity,
        notes,
      },
    });

    res.status(201).json(crisis);
  } catch {
    res.status(500).json({ error: "Error registrando crisis" });
  }
};
