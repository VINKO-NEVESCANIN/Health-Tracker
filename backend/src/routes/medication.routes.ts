import { Router } from "express";
import {
  getMedications,
  getMedication,
  createMedication,
  updateMedication,
  deleteMedication,
} from "../controllers/medication.controller";

const router = Router();

router.get("/", getMedications);
router.get("/:id", getMedication);
router.post("/", createMedication);
router.put("/:id", updateMedication);
router.delete("/:id", deleteMedication);

export default router;
