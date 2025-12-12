import { Router } from "express";
import { createMedication, getMedications, getMedication, updateMedication, deleteMedication } from "../controllers/medication.controller";
const router = Router();
router.post("/", createMedication);
router.get("/", getMedications);
router.get("/:id", getMedication);
router.put("/:id", updateMedication);
router.delete("/:id", deleteMedication);
export default router;
