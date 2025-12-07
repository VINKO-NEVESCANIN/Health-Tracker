import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const { userId, duration, caloriesBurned } = req.body;

    const workout = await prisma.workout.create({
      data: { userId, duration, caloriesBurned },
    });

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: "Error al crear workout" });
  }
};

export const getWorkoutsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const workouts = await prisma.workout.findMany({
      where: { userId: Number(userId) },
    });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener workouts" });
  }
};
