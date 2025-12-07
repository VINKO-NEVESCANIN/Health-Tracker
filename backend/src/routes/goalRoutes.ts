import { Router } from "express";
import { createGoal, getGoalsByUser } from "../controllers/goalController";

const router = Router();

router.post("/", createGoal);
router.get("/:userId", getGoalsByUser);

export default router;
