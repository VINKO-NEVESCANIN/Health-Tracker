import { Router } from "express";
import { createPatientMedication, getPatientMedications, deletePatientMedication } from "../controllers/patientMedication.controller";
import { authMiddleware } from "../middleware/auth";
import { requirePatientAccess } from "../middleware/access";

const router = Router();
router.use(authMiddleware());

router.post("/", createPatientMedication); // el controlador valida acceso al patientId
router.get("/:patientId", requirePatientAccess("patientId"), getPatientMedications);
router.delete("/:id", deletePatientMedication); // el controlador valida acceso al dueño del registro
export default router;
