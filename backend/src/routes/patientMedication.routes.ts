import { Router } from "express";
import { createPatientMedication, getPatientMedications, deletePatientMedication } from "../controllers/patientMedication.controller";
const router = Router();
router.post("/", createPatientMedication);
router.get("/:patientId", getPatientMedications);
router.delete("/:id", deletePatientMedication);
export default router;
