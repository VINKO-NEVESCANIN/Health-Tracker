import { Router } from "express";
import verifyToken from "../middleware/auth";
import { allowRoles } from "../middleware/roles";
import {
  createPatient, getPatients, getPatient, updatePatient, deletePatient, getTimeline
} from "../controllers/patient.controller";

const router = Router();

router.use(verifyToken);
router.post("/", allowRoles("doctor"), createPatient);
router.get("/", allowRoles("doctor"), getPatients);
router.get("/:id", allowRoles("doctor","admin","patient"), getPatient);
router.put("/:id", allowRoles("doctor","admin"), updatePatient);
router.delete("/:id", allowRoles("admin"), deletePatient);

// timeline: any doctor/admin or patient (if patient -> check ownership would be extra)
router.get("/:id/timeline", allowRoles("doctor","admin","patient"), getTimeline);

export default router;
