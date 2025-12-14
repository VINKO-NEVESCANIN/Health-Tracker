import { Router } from "express";
import { createAppointment, getAppointments, updateAppointment, deleteAppointment } from "../controllers/appointment.controller";
import { authMiddleware } from "../middleware/auth";
const router = Router();
router.post("/", authMiddleware(["doctor"]), createAppointment);
router.get("/", authMiddleware(["doctor"]), getAppointments);
router.put("/:id", authMiddleware(["doctor"]), updateAppointment);
router.delete("/:id", authMiddleware(["doctor"]), deleteAppointment);
export default router;
