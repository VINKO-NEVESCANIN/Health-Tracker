import { Request, Response } from "express";
import { prisma } from "../config/db";

export const dashboardStats = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;
    const totalPatients = await prisma.patient.count({ where: { doctorId } });
    const totalAppointments = await prisma.appointment.count({ where: { doctorId } });
    const totalCrisis = await prisma.crisis.count({ where: { patient: { doctorId } } });

    res.json({ totalPatients, totalAppointments, totalCrisis });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo estadísticas" });
  }
};
