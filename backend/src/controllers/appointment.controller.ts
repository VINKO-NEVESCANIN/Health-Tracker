import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createAppointment = async (req: any, res: Response) => {
  try {
    const { patientId, date, notes } = req.body;
    const doctorId = req.userId;
    if (!patientId || !date) return res.status(400).json({ error: "Campos faltantes" });

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date: new Date(date),
        notes,
      },
    });
    res.status(201).json(appointment);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error creando cita" });
  }
};

export const getAppointments = async (req: any, res: Response) => {
  try {
    const doctorId = req.userId;
    const appts = await prisma.appointment.findMany({ where: { doctorId }, orderBy: { date: "desc" } });
    res.json(appts);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo citas" });
  }
};

export const getAppointmentsByPatient = async (req: any, res: Response) => {
  try {
    const patientId = Number(req.params.id);
    const appts = await prisma.appointment.findMany({ where: { patientId }, orderBy: { date: "desc" } });
    res.json(appts);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo citas por paciente" });
  }
};

export const updateAppointment = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { date, notes, status } = req.body;
    const appt = await prisma.appointment.update({
      where: { id },
      data: { date: date ? new Date(date) : undefined, notes, status },
    });
    res.json(appt);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando cita" });
  }
};

export const deleteAppointment = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.appointment.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Error borrando cita" });
  }
};
