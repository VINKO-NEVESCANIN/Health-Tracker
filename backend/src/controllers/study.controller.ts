import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { patientId, type, notes, fileUrl } = req.body;
    if (!patientId || !type) return res.status(400).json({ error: "Campos faltantes" });
    const study = await prisma.study.create({ data: { patientId, type, notes, fileUrl } });
    res.status(201).json(study);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error creando estudio" });
  }
};

export const listStudies = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);
    const studies = await prisma.study.findMany({ where: { patientId }, orderBy: { date: "desc" } });
    res.json(studies);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo estudios" });
  }
};
