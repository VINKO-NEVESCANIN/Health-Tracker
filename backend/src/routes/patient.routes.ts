import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// CREATE PATIENT
router.post("/", async (req: any, res) => {
  try {
    const {
      firstName,
      lastName,
      epilepsyType,
      firstCrisisDate,
      totalCrisis,
      diseases,
      age,
      phone,
      address,
      email,
      doctorId
    } = req.body;

    const patient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        epilepsyType,
        firstCrisisDate: firstCrisisDate ? new Date(firstCrisisDate) : null,
        totalCrisis,
        diseases,
        age,
        phone,
        address,
        email,
        doctorId
      }
    });

    res.json(patient);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// GET ALL PATIENTS FOR A DOCTOR
router.get("/", async (req: any, res) => {
  const patients = await prisma.patient.findMany({
    where: { doctorId: req.user.userId }
  });

  res.json(patients);
});

// GET FULL TIMELINE OF PATIENT
router.get("/:id/timeline", async (req, res) => {
  const { id } = req.params;

  const data = await prisma.patient.findUnique({
    where: { id: Number(id) },
    include: {
      appointments: true,
      medications: { include: { medication: true } },
      studies: true,
      vitals: true,
      crisis: true
    }
  });

  res.json(data);
});

export default router;
