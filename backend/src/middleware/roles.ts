import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export const allowRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.role;
    if (!role) return res.status(401).json({ error: "No autorizado" });
    if (!roles.includes(role)) return res.status(403).json({ error: "Acceso denegado" });
    next();
  };
};
