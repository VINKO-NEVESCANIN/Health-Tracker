import { Router } from "express";
import { createVital } from "../controllers/vital.controller";

const router = Router();

router.post("/", createVital);

export default router;
