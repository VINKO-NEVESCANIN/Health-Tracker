import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// CREATE APPOINTMENT
router.post("/", async (req: any, res) => {
  try {
    const { patientId, date, notes } = req.body;

    const appt = await prisma.appointment.create({
      data: {
        patientId,
        date: new Date(date),
        notes,
        doctorId: req.user.userId
      }
    });

    res.json(appt);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// LIST DOCTOR APPOINTMENTS
router.get("/", async (req: any, res) => {
  const appts = await prisma.appointment.findMany({
    where: { doctorId: req.user.userId },
    include: { patient: true }
  });

  res.json(appts);
});

export default router;
