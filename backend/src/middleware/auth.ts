import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_dev";

export interface AuthRequest extends Request {
  userId?: number;
  role?: string;
}

export default function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Token requerido" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido" });
  }
}