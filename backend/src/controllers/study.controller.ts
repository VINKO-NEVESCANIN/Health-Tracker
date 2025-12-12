import { Request, Response } from "express";
import prisma from "../config/db";

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { patientId, type, notes, fileUrl } = req.body;

    const study = await prisma.study.create({
      data: {
        patientId,
        type,
        notes,
        fileUrl,
      },
    });

    return res.json(study);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPatientStudies = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.params.patientId);

    const studies = await prisma.study.findMany({
      where: { patientId },
    });

    return res.json(studies);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteStudy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.study.delete({
      where: { id },
    });

    return res.json({ message: "Study deleted" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
