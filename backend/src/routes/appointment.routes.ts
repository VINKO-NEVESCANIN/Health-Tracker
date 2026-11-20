import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  getMyAppointments,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";
import { authMiddleware } from "../middleware/auth";
const router = Router();
router.get("/mine", authMiddleware(["Paciente"]), getMyAppointments);
router.post("/", authMiddleware(["Doctor"]), createAppointment);
router.get("/", authMiddleware(["Doctor"]), getAppointments);
router.put("/:id", authMiddleware(["Doctor"]), updateAppointment);
router.delete("/:id", authMiddleware(["Doctor"]), deleteAppointment);
export default router;
