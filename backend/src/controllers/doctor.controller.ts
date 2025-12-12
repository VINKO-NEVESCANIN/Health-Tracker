import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getDoctors = async (_req: Request, res: Response) => {
  res.json(await prisma.doctor.findMany());
};

export const getDoctor = async (req: Request, res: Response) => {
  res.json(await prisma.doctor.findUnique({
    where: { id: Number(req.params.id) }
  }));
};

export const createDoctor = async (req: Request, res: Response) => {
  res.json(await prisma.doctor.create({ data: req.body }));
};

export const updateDoctor = async (req: Request, res: Response) => {
  res.json(await prisma.doctor.update({
    where: { id: Number(req.params.id) },
    data: req.body
  }));
};

export const deleteDoctor = async (req: Request, res: Response) => {
  await prisma.doctor.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Doctor deleted" });
};
