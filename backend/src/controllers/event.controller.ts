// src/controllers/event.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { patientId, title, description, date } = req.body;

    const event = await prisma.event.create({
      data: {
        patientId,
        title,
        description,
        date: new Date(date),
      },
    });

    res.status(201).json(event);
  } catch {
    res.status(500).json({ error: "Error creando evento" });
  }
};
