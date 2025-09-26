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
