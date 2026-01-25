import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyToken(req: any, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Token requerido" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: "Token inválido" });
  }
}
