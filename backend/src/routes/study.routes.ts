import { Router } from "express";
import {
  createStudy,
  getAllStudies,
  getPatientStudies,
  updateStudies,
  deleteStudy,
} from "../controllers/study.controller";
import { authMiddleware } from "../middleware/auth";
import { requirePatientAccess } from "../middleware/access";
const router = Router();
router.get("/", authMiddleware(["Doctor"]), getAllStudies);
router.post("/", authMiddleware(["Doctor", "Paciente"]), createStudy);
router.get("/patient/:patientId", authMiddleware(), requirePatientAccess("patientId"), getPatientStudies);
router.get("/:patientId", authMiddleware(), requirePatientAccess("patientId"), getPatientStudies);
router.put("/:id", authMiddleware(["Doctor", "Paciente"]), updateStudies);
router.delete("/:id", authMiddleware(["Doctor", "Admin"]), deleteStudy);
export default router;
