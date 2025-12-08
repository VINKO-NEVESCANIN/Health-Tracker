import { Router } from "express";
import verifyToken from "../middleware/auth";
import { allowRoles } from "../middleware/roles";
import { createStudy, listStudies } from "../controllers/study.controller";

const router = Router();

router.use(verifyToken);
router.post("/", allowRoles("doctor","admin"), createStudy);
router.get("/patient/:id", allowRoles("doctor","admin","patient"), listStudies);

export default router;
