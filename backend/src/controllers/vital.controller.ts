// src/controllers/vital.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createVital = async (req: Request, res: Response) => {
  try {
    const { patientId, type, value, date } = req.body;

    const vital = await prisma.vital.create({
      data: {
        patientId,
        type,
        value,
        date: new Date(date),
      },
    });

    res.status(201).json(vital);
  } catch {
    res.status(500).json({ error: "Error registrando vital" });
  }
};
