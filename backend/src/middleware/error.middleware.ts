import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.message);

  return res.status(500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
};
