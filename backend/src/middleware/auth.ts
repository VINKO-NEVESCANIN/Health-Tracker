// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const authMiddleware = (roles: string[] = []) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ error: "Token requerido" });

      const token = header.split(" ")[1];
      const decoded: any = jwt.verify(token, JWT_SECRET);

      req.userId = decoded.userId;
      req.role = decoded.role;

      const allowed = roles.map((r) => r.toLowerCase());
      if (allowed.length && !allowed.includes(String(decoded.role).toLowerCase())) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      next();
    } catch (e) {
      return res.status(401).json({ error: "Token inválido" });
    }
  };
};
