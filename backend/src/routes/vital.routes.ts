import { Router } from "express";
import { createVital, getVitals } from "../controllers/vital.controller";
const router = Router();
router.post("/", createVital);
router.get("/:patientId", getVitals);
export default router;
