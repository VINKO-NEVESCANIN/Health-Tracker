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
    const { patientId } = req.params;
    const study = await prisma.study.findFirst({
      where: { patientId: Number(patientId) },
    });

    if (!study) return res.json({});

    res.json({
      id: study.id,
      patientId: study.patientId,
      resNSMAP: study.resNSMAP,
      resRMNC: study.resRMNC,
      resEEG: study.resEEG,
      dateNSMAP: study.dateNSMAP,
      dateRMNC: study.dateRMNC,
      dateEEG: study.dateEEG,
    });
  } catch (err) {
    console.error("Error obteniendo estudios:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

export const updateStudies = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { patientId, dateEEG, dateRMNC, dateNSMAP, resEEG, resRMNC, resNSMAP } = req.body;

    const study = await prisma.study.update({
      where: { id },
      data: {
        patientId: patientId ? Number(patientId) : undefined,
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

// Obtener estudios
export const getPatientStudy = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.patientId);
    const study = await prisma.study.findFirst({ where: { patientId } });

    if (!study) return res.json({});

    res.json(study);
  } catch (err) {
    console.error("Error obteniendo estudios:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

// Crear o actualizar estudios
export const upsertStudy = async (req: Request, res: Response) => {
  try {
    const {
      patientId,
      resNSMAP,
      resRMNC,
      resEEG,
      dateNSMAP,
      dateRMNC,
      dateEEG,
    } = req.body;

    const existing = await prisma.study.findFirst({
      where: { patientId: Number(patientId) },
    });

    let study;
    if (existing) {
      study = await prisma.study.update({
        where: { id: existing.id },
        data: {
          resNSMAP,
          resRMNC,
          resEEG,
          dateNSMAP: dateNSMAP ? new Date(dateNSMAP) : null,
          dateRMNC: dateRMNC ? new Date(dateRMNC) : null,
          dateEEG: dateEEG ? new Date(dateEEG) : null,
        },
      });
    } else {
      study = await prisma.study.create({
        data: {
          patientId: Number(patientId),
          resNSMAP,
          resRMNC,
          resEEG,
          dateNSMAP: dateNSMAP ? new Date(dateNSMAP) : null,
          dateRMNC: dateRMNC ? new Date(dateRMNC) : null,
          dateEEG: dateEEG ? new Date(dateEEG) : null,
        },
      });
    }

    res.json(study);
  } catch (err) {
    console.error("Error en upsertStudy:", err);
    res.status(500).json({ error: "Error interno" });
  }
};