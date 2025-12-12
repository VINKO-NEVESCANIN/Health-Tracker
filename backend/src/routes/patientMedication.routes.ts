import { Router } from "express";
import {
  createPatientMedication,
  getPatientMedications,
  deletePatientMedication,
} from "../controllers/patientMedication.controller";

const router = Router();

// POST /patient-medications
router.post("/", createPatientMedication);

// GET /patient-medications/:patientId
router.get("/:patientId", getPatientMedications);

// DELETE /patient-medications/:id
router.delete("/:id", deletePatientMedication);

export default router;
