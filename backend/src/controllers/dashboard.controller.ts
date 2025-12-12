import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getDashboardStats = async (_req: Request, res: Response) => {
  const [patients, appointments, medications] = await Promise.all([
    prisma.patient.count(),
    prisma.appointment.count(),
    prisma.medication.count(),
  ]);

  res.json({
    totalPatients: patients,
    totalAppointments: appointments,
    totalMedications: medications,
  });
};
