import { Router } from "express";
import { crearEvento, listarEventos} from "../controllers/eventos.controller";

const router = Router();

// POST /api/eventos
router.post("/", crearEvento);
router.get("/", listarEventos);

export default router;
