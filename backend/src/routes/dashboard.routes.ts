import { Router } from "express";
import verifyToken from "../middleware/auth";
import { allowRoles } from "../middleware/roles";
import { dashboardStats } from "../controllers/dashboard.controller";

const router = Router();

router.use(verifyToken);
router.get("/stats", allowRoles("doctor","admin"), dashboardStats);

export default router;
