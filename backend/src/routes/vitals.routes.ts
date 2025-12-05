import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { patientId, heartRate, oxygen, temperature, notes } = req.body;

  const vital = await prisma.vital.create({
    data: {
      patientId,
      heartRate,
      oxygen,
      temperature,
      notes
    }
  });

  res.json(vital);
});

export default router;
