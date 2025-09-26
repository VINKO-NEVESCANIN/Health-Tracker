import { Router } from "express";
import { crearEvento } from "../controllers/eventos.controller";

const router = Router();

// POST /api/eventos
router.post("/", crearEvento);

export default router;
