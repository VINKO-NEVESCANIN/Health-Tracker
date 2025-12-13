// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import logger from "./config/logger";

import authRoutes from "./routes/auth.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentRoutes from "./routes/appointment.routes";
import medicationRoutes from "./routes/medication.routes";
import patientMedicationRoutes from "./routes/patientMedication.routes";
import studyRoutes from "./routes/study.routes";
import vitalRoutes from "./routes/vital.routes";
import crisisRoutes from "./routes/crisis.routes";

dotenv.config();

const app = express();

// 🔹 Middlewares base
app.use(cors());
app.use(express.json());

// 🔥 Morgan → Winston
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// 🔹 Rutas principales
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/medications", medicationRoutes);
app.use("/patient-medications", patientMedicationRoutes);
app.use("/studies", studyRoutes);
app.use("/vitals", vitalRoutes);
app.use("/crisis", crisisRoutes);

// 🔹 Ruta raíz
app.get("/", (_req, res) => {
  res.send("API Health Tracker funcionando 🚀");
});

// 🔹 Servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});
