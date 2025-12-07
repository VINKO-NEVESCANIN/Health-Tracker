import { Router } from "express";
import { createWorkout, getWorkoutsByUser } from "../controllers/workoutController";

const router = Router();

router.post("/", createWorkout);
router.get("/:userId", getWorkoutsByUser);

export default router;
