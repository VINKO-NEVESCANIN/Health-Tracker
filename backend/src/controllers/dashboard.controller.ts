import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dashboardStats = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;

    const patients = await prisma.patient.count({ where: { doctorId } });
    const appointments = await prisma.appointment.count({ where: { doctorId } });

    const crisis = await prisma.crisis.count({
      where: {
        patient: { doctorId }
      }
    });

    res.json({
      totalPatients: patients,
      totalAppointments: appointments,
      totalCrisis: crisis
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo estadísticas" });
  }
};
