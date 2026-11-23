import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Freno a fuerza bruta: 10 intentos por IP+correo cada 15 minutos
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  key: (req) => `${req.ip}:${String(req.body?.email ?? "").toLowerCase()}`,
});
// Registro: 20 por IP por hora
const registerLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 20 });

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", authMiddleware(), me);
export default router;
