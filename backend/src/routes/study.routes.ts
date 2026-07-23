import { Router } from "express";
import { createStudy, getPatientStudies, deleteStudy } from "../controllers/study.controller";
const router = Router();
router.post("/", createStudy);
router.get("/:patientId", getPatientStudies);
router.delete("/:id", deleteStudy);
export default router;
