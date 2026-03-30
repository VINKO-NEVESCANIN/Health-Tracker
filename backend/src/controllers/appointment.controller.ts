// src/controllers/appointment.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

export const createAppointment = async (req: any, res: Response) => {
  try {
    const { id, date, notes, time } = req.body;
    if (!id || !date) return res.status(400).json({ error: "id y date requeridos" });

    const appointment = await prisma.appointment.create({
      data: {
        patientId: Number(id),
        date: new Date(date),
        notes,
        time,
        doctorId: req.doctorId, // Asumiendo que doctorId viene del token
      },
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando cita" });
  }
};

export const getAppointments = async (req: any, res: Response) => {
  try {
    const doctorId = req.doctorId;
    const appointments = await prisma.appointment.findMany({
      where: { doctorId },
      orderBy: { date: "asc" },
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo citas" });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const appointment = await prisma.appointment.update({ where: { id }, data: req.body });
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error actualizando cita" });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.appointment.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando cita" });
  }
};
