import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentRoutes from "./routes/appointment.routes";
import verifyToken from "./middleware/auth.middleware";
// import dotenv from "dotenv";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/auth", authRoutes);

// Rutas protegidas
app.use("/patients", verifyToken, patientRoutes);
app.use("/appointments", verifyToken, appointmentRoutes);

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
