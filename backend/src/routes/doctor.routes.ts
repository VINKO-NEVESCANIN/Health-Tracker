import { Router } from "express";
import { getDoctorProfile } from "../controllers/doctor.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/me", authMiddleware(["doctor"]), getDoctorProfile);

export default router;
