import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getOrders = async (_req: Request, res: Response) => {
  res.json(await prisma.order.findMany());
};

export const getOrder = async (req: Request, res: Response) => {
  res.json(await prisma.order.findUnique({
    where: { id: Number(req.params.id) }
  }));
};

export const createOrder = async (req: Request, res: Response) => {
  res.json(await prisma.order.create({ data: req.body }));
};

export const updateOrder = async (req: Request, res: Response) => {
  res.json(await prisma.order.update({
    where: { id: Number(req.params.id) },
    data: req.body
  }));
};

export const deleteOrder = async (req: Request, res: Response) => {
  await prisma.order.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Order deleted" });
};
