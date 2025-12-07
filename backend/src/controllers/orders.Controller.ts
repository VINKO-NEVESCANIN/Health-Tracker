import { Request, Response } from "express";

let orders: any[] = []; //Temporal, luego usar DB

export const getOrders = (req: Request, res: Response) => {
    res.json(orders);
};

export const createOrder = (req: Request, res: Response) => {
    const newOrder = req.body;
    orders.push(newOrder);
    res.status(201).json(newOrder);
};