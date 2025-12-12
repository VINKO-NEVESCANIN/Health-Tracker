import { Router } from "express";
import { createMedication, getMedications } from "../controllers/medication.controller";

const router = Router();

router.post("/", createMedication);
router.get("/", getMedications);

export default router;
