import { Router } from "express";
import verifyToken from "../middleware/auth";
import { allowRoles } from "../middleware/roles";
import { createCrisis, listCrisis } from "../controllers/crisis.controller";

const router = Router();

router.use(verifyToken);
router.post("/", allowRoles("doctor","admin"), createCrisis);
router.get("/patient/:id", allowRoles("doctor","admin","patient"), listCrisis);

export default router;
