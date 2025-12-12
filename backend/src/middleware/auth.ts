// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_dev";

export const authMiddleware = (roles: string[] = []) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ error: "Token requerido" });

      const token = header.split(" ")[1];
      const decoded: any = jwt.verify(token, JWT_SECRET);

      req.userId = decoded.userId;
      req.role = decoded.role;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      next();
    } catch (e) {
      return res.status(401).json({ error: "Token inválido" });
    }
  };
};
