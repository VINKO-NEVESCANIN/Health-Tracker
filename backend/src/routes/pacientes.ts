import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Obtener todos los pacientes
router.get("/", async (req: Request, res: Response) => {
  try {
    const pacientes = await prisma.patient.findMany(); // ✔️ Nombre correcto
    res.json(pacientes);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
});

// Crear paciente
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, age, email } = req.body;

    const paciente = await prisma.patient.create({
      data: { name, age: Number(age), email },
    });

    res.json(paciente);
  } catch (error) {
    console.error("Error creando paciente:", error);
    res.status(500).json({ error: "Error al crear paciente" });
  }
});

export default router;
