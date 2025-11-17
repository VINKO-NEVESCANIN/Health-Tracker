import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  getTimeline
} from "../controllers/patient.controller";

const router = Router();

router.post("/", requireAuth, createPatient);
router.get("/", requireAuth, getPatients);
router.get("/:id", requireAuth, getPatient);
router.put("/:id", requireAuth, updatePatient);
router.delete("/:id", requireAuth, deletePatient);

// timeline unificado
router.get("/:id/timeline", requireAuth, getTimeline);

export default router;
