import { Router } from "express";
import { createMetric, getMetricsByUser } from "../controllers/healthMetricController";

const router = Router();

router.post("/", createMetric);
router.get("/:userId", getMetricsByUser);

export default router;
