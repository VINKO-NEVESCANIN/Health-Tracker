import { Router } from "express";
import { createMeal, getMealsByUser } from "../controllers/mealController";

const router = Router();

router.post("/", createMeal);
router.get("/:userId", getMealsByUser);

export default router;
