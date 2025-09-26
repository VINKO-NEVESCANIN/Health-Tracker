import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const crearEvento = async (req: Request, res: Response) => {
  try {
    const { description, intensity, userId } = req.body;

    if (!description || !intensity || !userId) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoEvento = await prisma.event.create({
      data: {
        description,
        intensity,
        userId,
      },
    });

    res.json(nuevoEvento);
  } catch (error) {
    console.error("❌ Error al crear evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const listarEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await prisma.event.findMany({
      include: { user: true } // opcional: traer datos del usuario
    });
    res.json(eventos);
  } catch (error) {
    console.error("❌ Error al listar eventos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

