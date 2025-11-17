import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_dev";

export interface AuthRequest extends Request {
  userId?: number;
  role?: string;
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Token error" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Token malformado" });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.userId = payload.userId;
    req.role = payload.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
