import { Router } from "express";
import { createCrisis, getCrisis, getDateCrisis } from "../controllers/crisis.controller";
import { authMiddleware } from "../middleware/auth";
import { requirePatientAccess } from "../middleware/access";

const router = Router();
router.use(authMiddleware());

router.post("/", createCrisis); // el controlador valida acceso al patientId
router.get("/date/:crisisDate", authMiddleware(["Doctor", "Admin"]), getDateCrisis);
router.get("/:patientId", requirePatientAccess("patientId"), getCrisis);
export default router;
