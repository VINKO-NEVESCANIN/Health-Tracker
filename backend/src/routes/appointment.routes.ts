import { Router } from "express";
import verifyToken from "../middleware/auth";
import { allowRoles } from "../middleware/roles";
import {
  createAppointment, getAppointments, getAppointmentsByPatient, updateAppointment, deleteAppointment
} from "../controllers/appointment.controller";

const router = Router();

router.use(verifyToken);
router.post("/", allowRoles("doctor"), createAppointment);
router.get("/", allowRoles("doctor"), getAppointments);
router.get("/patient/:id", allowRoles("doctor","admin","patient"), getAppointmentsByPatient);
router.put("/:id", allowRoles("doctor","admin"), updateAppointment);
router.delete("/:id", allowRoles("admin"), deleteAppointment);

export default router;
