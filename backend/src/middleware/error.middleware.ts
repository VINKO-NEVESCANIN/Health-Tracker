import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { IS_PROD } from "../config/env";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack || err.message);
  // En producción no se expone el detalle interno del error
  return res.status(500).json({
    success: false,
    message: IS_PROD ? "Error interno del servidor" : err.message,
  });
};
