// src/controllers/study.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { patientId, dateEEG, dateRMNC, dateNSMAP, resEEG, resRMNC, resNSMAP} = req.body;
    if (!patientId) return res.status(400).json({ error: "patientId requeridos" });

    const study = await prisma.study.create({
      data: { 
        patientId: Number(patientId), 
        dateEEG: dateEEG ? new Date(dateEEG) : undefined, 
        dateRMNC: dateRMNC ? new Date(dateRMNC) : undefined, 
        dateNSMAP: dateNSMAP ? new Date(dateNSMAP) : undefined, 
        resEEG: resEEG ?? null, 
        resRMNC: resRMNC ?? null, 
        resNSMAP: resNSMAP ?? null 
      },
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

export const updateStudies = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { dateEEG, dateRMNC, dateNSMAP, resEEG, resRMNC, resNSMAP } = req.body;

    const study = await prisma.study.update({
      where: { id },
      data: {
        dateEEG: dateEEG ? new Date(dateEEG) : undefined,
        dateRMNC: dateRMNC ? new Date(dateRMNC) : undefined,
        dateNSMAP: dateNSMAP ? new Date(dateNSMAP) : undefined,
        resEEG: resEEG ?? null,
        resRMNC: resRMNC ?? null,
        resNSMAP: resNSMAP ?? null
      },
    });
    res.json(study);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando estudio" });
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
