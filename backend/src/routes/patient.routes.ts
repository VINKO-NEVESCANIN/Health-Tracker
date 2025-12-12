import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient
} from "../controllers/patient.controller";

const router = Router();

router.post("/", authMiddleware(["doctor"]), createPatient);
router.get("/", authMiddleware(["doctor"]), getPatients);
router.get("/:id", authMiddleware(["doctor"]), getPatient);
router.put("/:id", authMiddleware(["doctor"]), updatePatient);
router.delete("/:id", authMiddleware(["doctor"]), deletePatient);

export default router;
