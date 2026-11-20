// src/controllers/summary.controller.ts
import { Response } from "express";
import prisma from "../config/db";

// Resumen del día para la pantalla de inicio del doctor
export const getDoctorSummary = async (req: any, res: Response) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [appointmentsToday, activePatients, crisisLast7Days] = await Promise.all([
      prisma.appointment.count({
        where: { doctorId: req.userId, date: { gte: start, lt: end } },
      }),
      prisma.user.count({ where: { role: "Paciente" } }),
      prisma.crisis.count({ where: { crisisDate: { gte: weekAgo } } }),
    ]);

    res.json({ appointmentsToday, activePatients, crisisLast7Days });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo resumen" });
  }
};
