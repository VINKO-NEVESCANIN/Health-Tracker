import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Add medication to patient
router.post("/", async (req, res) => {
  try {
    const { patientId, medicationId, dose, interval, startDate, endDate } = req.body;

    const data = await prisma.patientMedication.create({
      data: {
        patientId,
        medicationId,
        dose,
        interval,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      }
    });

    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// List medications for patient
router.get("/:patientId", async (req, res) => {
  const meds = await prisma.patientMedication.findMany({
    where: { patientId: Number(req.params.patientId) },
    include: { medication: true }
  });

  res.json(meds);
});

export default router;
