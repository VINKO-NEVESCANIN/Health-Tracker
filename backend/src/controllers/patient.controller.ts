// src/controllers/patient.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createPatient = async (req: any, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      epilepsyType,
      firstCrisisDate,
      age,
      phone,
      address,
      diseases,
      email
    } = req.body;

    const doctorId = req.userId;
    if (!firstName) return res.status(400).json({ error: "firstName es requerido" });

    const patient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        epilepsyType,
        firstCrisisDate: firstCrisisDate ? new Date(firstCrisisDate) : undefined,
        age,
        phone,
        address,
        diseases,
        email,
        doctorId,
      },
    });

    res.status(201).json(patient);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error creando paciente" });
  }
};

export const getPatients = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;
    const search = (req.query.search as string) || "";

    const patients = await prisma.patient.findMany({
      where: {
        doctorId,
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo pacientes" });
  }
};

export const getPatient = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
        medications: { include: { medication: true } },
        studies: true,
        vitals: true,
        crisis: true,
      },
    });

    if (!patient) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo paciente" });
  }
};

export const updatePatient = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const patient = await prisma.patient.update({
      where: { id },
      data: req.body,
    });
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando paciente" });
  }
};

export const deletePatient = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.patient.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error borrando paciente" });
  }
};
