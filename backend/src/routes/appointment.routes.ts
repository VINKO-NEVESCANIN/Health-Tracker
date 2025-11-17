import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { createAppointment, getAppointments, updateAppointment, deleteAppointment, getAppointmentsByPatient } from "../controllers/appointment.controller";

const router = Router();

router.post("/", requireAuth, createAppointment);
router.get("/", requireAuth, getAppointments);
router.get("/patient/:id", requireAuth, getAppointmentsByPatient);
router.put("/:id", requireAuth, updateAppointment);
router.delete("/:id", requireAuth, deleteAppointment);

export default router;
