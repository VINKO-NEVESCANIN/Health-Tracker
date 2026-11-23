// src/middleware/rateLimit.ts
// Limitador simple en memoria (sin dependencias). Suficiente para una sola instancia.
import { Request, Response, NextFunction } from "express";

export const rateLimit = (opts: { windowMs: number; max: number; key?: (req: Request) => string }) => {
  const hits = new Map<string, { count: number; reset: number }>();
  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const k = opts.key ? opts.key(req) : req.ip || "unknown";
    const entry = hits.get(k);
    if (!entry || entry.reset < now) {
      hits.set(k, { count: 1, reset: now + opts.windowMs });
    } else {
      entry.count += 1;
      if (entry.count > opts.max) {
        res.setHeader("Retry-After", Math.ceil((entry.reset - now) / 1000));
        return res.status(429).json({ error: "Demasiados intentos. Intenta más tarde." });
      }
    }
    // limpieza ocasional
    if (hits.size > 5000) for (const [key, v] of hits) if (v.reset < now) hits.delete(key);
    next();
  };
};
