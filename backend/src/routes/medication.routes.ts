import { Router } from "express";
import { createMedication, getMedications, getMedication, updateMedication, deleteMedication } from "../controllers/medication.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.use(authMiddleware());

// Catálogo compartido: cualquier usuario con sesión puede consultarlo y agregar entradas;
// modificar o borrar entradas es solo del personal médico.
router.post("/", createMedication);
router.get("/", getMedications);
router.get("/:id", getMedication);
router.put("/:id", authMiddleware(["Doctor", "Admin"]), updateMedication);
router.delete("/:id", authMiddleware(["Doctor", "Admin"]), deleteMedication);
export default router;
