// src/controllers/appointment.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createAppointment = async (req: any, res: Response) => {
  try {
    const { patientId, date, reason, notes } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        date: new Date(date),
        reason,
        notes,
        doctorId: req.userId,
      },
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Error creando cita" });
  }
};

export const getAppointments = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;

    const appointments = await prisma.appointment.findMany({
      where: { doctorId },
      orderBy: { date: "asc" },
      include: { patient: true },
    });

    res.json(appointments);
  } catch {
    res.status(500).json({ error: "Error obteniendo citas" });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const appointment = await prisma.appointment.update({
      where: { id },
      data: req.body,
    });

    res.json(appointment);
  } catch {
    res.status(500).json({ error: "Error actualizando cita" });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.appointment.delete({ where: { id } });

    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Error eliminando cita" });
  }
};
