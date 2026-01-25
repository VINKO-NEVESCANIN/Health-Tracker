// src/controllers/study.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { patientId, type, notes, fileUrl } = req.body;
    if (!patientId || !type) return res.status(400).json({ error: "patientId y type requeridos" });

    const study = await prisma.study.create({
      data: { patientId: Number(patientId), type, notes: notes ?? null, fileUrl: fileUrl ?? null },
    });
    res.status(201).json(study);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando estudio" });
  }
};

export const getPatientStudies = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.patientId);
    const studies = await prisma.study.findMany({ where: { patientId } });
    res.json(studies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo estudios" });
  }
};

export const deleteStudy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.study.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando estudio" });
  }
};
