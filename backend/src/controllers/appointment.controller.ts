// src/controllers/appointment.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

// El modelo Appointment no tiene relación con el paciente (solo patientId),
// así que traemos los datos del paciente/doctor en una consulta aparte.
async function withPeople(appointments: any[]) {
  const ids = Array.from(
    new Set(appointments.flatMap((a) => [a.patientId, a.doctorId]))
  );
  const users = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: { id: true, firstName: true, lastName: true, age: true, epilepsyType: true },
  });
  const byId = new Map(users.map((u) => [u.id, u]));
  return appointments.map((a) => ({
    ...a,
    patient: byId.get(a.patientId) ?? null,
    doctor: byId.get(a.doctorId) ?? null,
  }));
}

export const createAppointment = async (req: any, res: Response) => {
  try {
    const { patientId, id, date, notes, time } = req.body;
    const pid = Number(patientId ?? id);
    if (!pid || !date) return res.status(400).json({ error: "patientId y date requeridos" });

    const appointment = await prisma.appointment.create({
      data: {
        patientId: pid,
        date: new Date(date),
        notes: notes ?? null,
        time: time ?? "",
        doctorId: req.userId,
      },
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando cita" });
  }
};

// Citas del doctor autenticado
export const getAppointments = async (req: any, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { doctorId: req.userId },
      orderBy: { date: "asc" },
    });
    res.json(await withPeople(appointments));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo citas" });
  }
};

// Citas del paciente autenticado
export const getMyAppointments = async (req: any, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { patientId: req.userId },
      orderBy: { date: "asc" },
    });
    res.json(await withPeople(appointments));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo citas" });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { date, notes, time, status } = req.body;
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        ...(date ? { date: new Date(date) } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(time !== undefined ? { time } : {}),
        ...(status !== undefined ? { status } : {}),
      },
    });
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
