import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentRoutes from "./routes/appointment.routes";
import medicationRoutes from "./routes/medication.routes";
import vitalRoutes from "./routes/vital.routes";
import crisisRoutes from "./routes/crisis.routes";
import studyRoutes from "./routes/study.routes";
import dashboardRoutes from "./routes/dashboard.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Public
app.use("/api/auth", authRoutes);

// Protected
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/vitals", vitalRoutes);
app.use("/api/crisis", crisisRoutes);
app.use("/api/studies", studyRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (_req, res) => res.send("API Health-Tracker OK"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
