import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createGoal = async (req: Request, res: Response) => {
  try {
    const { userId, description, targetValue } = req.body;

    const goal = await prisma.goal.create({
      data: { userId, description, targetValue },
    });

    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: "Error al crear meta" });
  }
};

export const getGoalsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const goals = await prisma.goal.findMany({
      where: { userId: Number(userId) },
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener metas" });
  }
};
