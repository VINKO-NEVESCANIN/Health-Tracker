import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { patientId, intensity, durationMin, notes } = req.body;

  const crisis = await prisma.crisis.create({
    data: {
      patientId,
      intensity,
      durationMin,
      notes
    }
  });

  res.json(crisis);
});

export default router;
