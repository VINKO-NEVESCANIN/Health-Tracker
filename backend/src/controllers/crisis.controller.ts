// src/controllers/crisis.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createCrisis = async (req: Request, res: Response) => {
  try {
    const { patientId, date, duration, recuperation, unconscious } = req.body;
    if (!patientId) return res.status(400).json({ error: "patientId requerido" });

    const crisis = await prisma.crisis.create({
      data: {
        patientId: Number(patientId),
        crisisDate: new Date(date),
        duration: duration ?? null,
        recuperation: recuperation ?? null,
        unconscius: false,
      },
    });

    res.status(201).json(crisis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registrando crisis" });
  }
};

export const getCrisis = async (req: any, res: Response) => {
  try {
    const patientId = Number(req.params.patientId);
    const crisis = await prisma.crisis.findMany({
      where: { patientId },
      orderBy: { crisisDate: "desc" },
    });

    res.json(crisis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo crisis" });
  }
};

export const getDateCrisis = async (req: any, res: Response) => {
  try {
    const crisisDate = new Date(req.params.crisisDate);
    const crisis = await prisma.crisis.findMany({
      where: { crisisDate },
    });

    if (crisis.length === 0) return res.status(404).json({ error: "Crisis no encontrada" });
    res.json(crisis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo crisis" });
  }
};
