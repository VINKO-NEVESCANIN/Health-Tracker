// src/controllers/patient.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createPatient = async (req: any, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      height,
      weight,
      birthdate,
      firstCrisisDate,
      epilepsyType,
      anxiety,
      migraine,
      addictions,
      hypertension,
      cogniDisorder,
      respiDisorder
    } = req.body;

    const doctorId = req.userId;
    if (!firstName) return res.status(400).json({ error: "firstName es requerido" });

    const patient = await prisma.patient.create({
      data: {
     firstName,
      lastName,
      gender,
      height,
      weight,
      birthdate,
      firstCrisisDate: firstCrisisDate ? new Date(firstCrisisDate) : undefined,
      epilepsyType,
      anxiety,
      migraine,
      addictions,
      hypertension,
      cogniDisorder,
      respiDisorder
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
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
        ],
      },
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
        crisis: true
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

    console.log("Body recibido en updatePatient:", req.body);

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        birthdate: new Date(req.body.birthdate),
        firstCrisisDate: new Date(req.body.firstCrisisDate),
        epilepsyType: req.body.epilepsyType,
        anxiety: req.body.anxiety === true || req.body.anxiety === "true",
        migraine: req.body.migraine === true || req.body.migraine === "true",
        addictions: req.body.addictions === true || req.body.addictions === "true",
        hypertension: req.body.hypertension === true || req.body.hypertension === "true",
        cogniDisorder: req.body.cogniDisorder === true || req.body.cogniDisorder === "true",
        respiDisorder: req.body.respiDisorder === true || req.body.respiDisorder === "true",

      };

       console.log("Data que se manda a Prisma:", data);

      const patient = await prisma.patient.update({
      where: { id },
      data,
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
