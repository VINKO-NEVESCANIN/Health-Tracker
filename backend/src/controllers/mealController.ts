import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createMeal = async (req: Request, res: Response) => {
  try {
    const { userId, description, calories } = req.body;

    const meal = await prisma.meal.create({
      data: { userId, description, calories },
    });

    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar comida" });
  }
};

export const getMealsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const meals = await prisma.meal.findMany({
      where: { userId: Number(userId) },
    });

    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comidas" });
  }
};
