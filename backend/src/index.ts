import express from "express";
import userRoutes from "./routes/user.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentRoutes from "./routes/appointment.routes";
import crisisRoutes from "./routes/crisis.routes";
import medicationRoutes from "./routes/medication.routes";
import patientMedicationRoutes from "./routes/patientMedication.routes";

const app = express();
app.use(express.json());

// Rutas principales
app.use("/users", userRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/crisis", crisisRoutes);
app.use("/medications", medicationRoutes);
app.use("/patient-medications", patientMedicationRoutes);

// Levantar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
