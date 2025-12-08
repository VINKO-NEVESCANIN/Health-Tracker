import { Router } from "express";
import verifyToken from "../middleware/auth";
import { allowRoles } from "../middleware/roles";
import { createVital, listVitals } from "../controllers/vital.controller";

const router = Router();

router.use(verifyToken);
router.post("/", allowRoles("doctor","admin"), createVital);
router.get("/patient/:id", allowRoles("doctor","admin","patient"), listVitals);

export default router;
