import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Upload study
router.post("/", async (req, res) => {
  const { patientId, type, notes, fileUrl } = req.body;

  const study = await prisma.study.create({
    data: {
      patientId,
      type,
      notes,
      fileUrl
    }
  });

  res.json(study);
});

export default router;
