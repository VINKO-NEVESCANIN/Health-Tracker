// src/server.ts
import dotenv from "dotenv";
dotenv.config(); // antes de importar nada que lea process.env

import express from "express";
import cors from "cors";
import morgan from "morgan";

import { IS_PROD } from "./config/env";
import logger from "./config/logger";
import prisma from "./config/db";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";
import medicationRoutes from "./routes/medication.routes";
import patientMedicationRoutes from "./routes/patientMedication.routes";
import studyRoutes from "./routes/study.routes";
import crisisRoutes from "./routes/crisis.routes";
import summaryRoutes from "./routes/summary.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Detrás del proxy de la plataforma (Render, Railway, Fly...): necesario para req.ip real
app.set("trust proxy", 1);
app.disable("x-powered-by");

// Cabeceras básicas de seguridad
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  if (IS_PROD) res.setHeader("Strict-Transport-Security", "max-age=15552000");
  next();
});

// La app móvil no necesita CORS. Solo se permiten orígenes web explícitos (CORS_ORIGIN, separados por coma);
// en desarrollo se permite todo para poder probar con Expo web.
const origins = (process.env.CORS_ORIGIN || "").split(",").map((o) => o.trim()).filter(Boolean);
app.use(cors({ origin: IS_PROD ? origins : true }));
app.use(express.json({ limit: "100kb" }));

app.use(
  morgan(IS_PROD ? "combined" : "dev", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Comprobación de salud para la plataforma de hosting
app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "db_unavailable" });
  }
});

app.get("/", (_req, res) => {
  res.send("API Health Tracker funcionando 🚀");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/medications", medicationRoutes);
app.use("/patient-medications", patientMedicationRoutes);
app.use("/studies", studyRoutes);
app.use("/crisis", crisisRoutes);
app.use("/summary", summaryRoutes);

app.use((_req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

// MIDDLEWARE DE ERRORES (SIEMPRE AL FINAL)
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
const server = app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`);
});

const shutdown = async () => {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
