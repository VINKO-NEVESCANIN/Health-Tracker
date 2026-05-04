import { Router } from "express";
import { createCrisis, getCrisis, getDateCrisis, getDateCrisisByRange, getPatientCrisis } from "../controllers/crisis.controller";
const router = Router();
router.post("/", createCrisis);
router.get("/:patientId", getCrisis);
router.get("/date/:crisisDate", getDateCrisis);
router.get("/patients/:patientId/crisis", getPatientCrisis);
router.get("/range/:patientId", getDateCrisisByRange);
export default router;
