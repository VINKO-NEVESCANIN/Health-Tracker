import { Router } from "express";
import { getDoctorSummary } from "../controllers/summary.controller";
import { authMiddleware } from "../middleware/auth";
const router = Router();
router.get("/", authMiddleware(["Doctor"]), getDoctorSummary);
export default router;
