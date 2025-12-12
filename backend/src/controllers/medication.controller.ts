import { Request, Response } from "express";
import prisma from "../config/db";

export const createMedication = async (req: Request, res: Response) => {
  try {
    const med = await prisma.medication.create({
      data: req.body
    });
    res.json(med);
  } catch (error) {
    res.status(500).json({ error: "Error creating medication" });
  }
};

export const getMedications = async (req: Request, res: Response) => {
  try {
    const meds = await prisma.medication.findMany();
    res.json(meds);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medications" });
  }
};

export const getMedication = async (req: Request, res: Response) => {
  try {
    const med = await prisma.medication.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!med) return res.status(404).json({ error: "Medication not found" });

    res.json(med);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medication" });
  }
};

export const updateMedication = async (req: Request, res: Response) => {
  try {
    const med = await prisma.medication.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(med);
  } catch (error) {
    res.status(500).json({ error: "Error updating medication" });
  }
};

export const deleteMedication = async (req: Request, res: Response) => {
  try {
    await prisma.medication.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: "Medication deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting medication" });
  }
};
