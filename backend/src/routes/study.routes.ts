import { Router } from "express";
import { createStudy, getPatientStudies, deleteStudy, upsertStudy } from "../controllers/study.controller";
const router = Router();
router.post("/", createStudy);
router.get("/:patientId", getPatientStudies);
router.delete("/:id", deleteStudy);
router.post("/upsert", upsertStudy);
export default router;
