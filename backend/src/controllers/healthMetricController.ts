import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createMetric = async (req: Request, res: Response) => {
  try {
    const { userId, type, value } = req.body;

    const metric = await prisma.healthMetric.create({
      data: { userId, type, value },
    });

    res.json(metric);
  } catch (error) {
    res.status(500).json({ error: "Error al crear métrica" });
  }
};

export const getMetricsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const metrics = await prisma.healthMetric.findMany({
      where: { userId: Number(userId) },
    });

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener métricas" });
  }
};
