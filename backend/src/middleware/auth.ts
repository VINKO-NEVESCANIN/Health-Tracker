// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_dev";

export const authMiddleware = (roles: string[] = []) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "Token requerido" });

      const decoded: any = jwt.verify(token, JWT_SECRET);

      req.userId = decoded.userId;
      req.role = decoded.role;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: "Token inválido" });
    }
  };
};
