// src/server.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentRoutes from "./routes/appointment.routes";
import medicationRoutes from "./routes/medication.routes";
import patientMedicationRoutes from "./routes/patientMedication.routes";
import studyRoutes from "./routes/study.routes";
import vitalRoutes from "./routes/vital.routes";
import crisisRoutes from "./routes/crisis.routes";
import eventRoutes from "./routes/event.routes";
import doctorRoutes from "./routes/doctor.routes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// RUTAS
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/medications", medicationRoutes);
app.use("/patient-medications", patientMedicationRoutes);
app.use("/studies", studyRoutes);
app.use("/vitals", vitalRoutes);
app.use("/crisis", crisisRoutes);
app.use("/events", eventRoutes);
app.use("/doctor", doctorRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
