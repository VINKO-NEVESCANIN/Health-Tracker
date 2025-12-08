import { Router } from "express";
import verifyToken from "../middleware/auth";
import { allowRoles } from "../middleware/roles";
import { createMedication, listMedications, assignMedication, listPatientMedications } from "../controllers/medication.controller";

const router = Router();

router.use(verifyToken);
router.post("/", allowRoles("doctor","admin"), createMedication);
router.get("/", allowRoles("doctor","admin"), listMedications);
router.post("/assign", allowRoles("doctor","admin"), assignMedication);
router.get("/patient/:id", allowRoles("doctor","admin","patient"), listPatientMedications);

export default router;
