import { Router } from "express";
import { createCrisis, getCrisis, getDateCrisis, getPatientCrisis } from "../controllers/crisis.controller";
const router = Router();
router.post("/", createCrisis);
router.get("/:patientId", getCrisis);
router.get("/date/:crisisDate", getDateCrisis);
router.get("/patients/:patientId/crisis", getPatientCrisis);
export default router;
