import { Router } from "express";
import { createCrisis } from "../controllers/crisis.controller";
const router = Router();
router.post("/", createCrisis);
export default router;
