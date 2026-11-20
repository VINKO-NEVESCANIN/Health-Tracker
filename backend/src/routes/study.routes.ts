import { Router } from "express";
import {
  createStudy,
  getAllStudies,
  getPatientStudies,
  updateStudies,
  deleteStudy,
} from "../controllers/study.controller";
import { authMiddleware } from "../middleware/auth";
const router = Router();
router.get("/", authMiddleware(["Doctor"]), getAllStudies);
router.post("/", authMiddleware(["Doctor"]), createStudy);
router.get("/patient/:patientId", authMiddleware(), getPatientStudies);
router.get("/:patientId", authMiddleware(), getPatientStudies);
router.put("/:id", authMiddleware(["Doctor"]), updateStudies);
router.delete("/:id", authMiddleware(["Doctor"]), deleteStudy);
export default router;
