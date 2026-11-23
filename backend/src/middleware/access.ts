// src/middleware/access.ts
// Reglas de acceso a datos de un paciente:
//  - Doctor / Admin: pueden ver y modificar datos de pacientes (modelo de una sola clínica).
//  - Paciente: solo sus propios datos.
import { Response, NextFunction } from "express";

export const isStaff = (req: any) => ["doctor", "admin"].includes(String(req.role).toLowerCase());
export const isAdmin = (req: any) => String(req.role).toLowerCase() === "admin";
export const canAccessPatient = (req: any, patientId: number) =>
  isStaff(req) || (!!req.userId && req.userId === patientId);

// Middleware: exige acceso al paciente indicado en req.params[param]
export const requirePatientAccess = (param: string) => (req: any, res: Response, next: NextFunction) => {
  const id = Number(req.params[param]);
  if (!id || !canAccessPatient(req, id)) return res.status(403).json({ error: "Acceso denegado" });
  next();
};
