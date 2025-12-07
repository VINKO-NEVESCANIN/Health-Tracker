import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear estudio
export const createStudy = async (req: Request, res: Response) => {
  try {
    const { patientId, type, notes, fileUrl } = req.body;

    if (!patientId || !type) {
      return res.status(400).json({ error: "Campos obligatorios faltantes" });
    }

    const study = await prisma.study.create({
      data: {
        patientId,
        type,
        notes,
        fileUrl
      }
    });

    res.status(201).json(study);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando estudio" });
  }
};

// Listar estudios por paciente
export const listStudies = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.id);

    const studies = await prisma.study.findMany({
      where: { patientId },
      orderBy: { date: "desc" }
    });

    res.json(studies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo estudios" });
  }
};
