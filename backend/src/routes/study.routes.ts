import { Router } from "express";
import { createStudy } from "../controllers/study.controller";

const router = Router();

router.post("/", createStudy);

export default router;
