import { Router } from "express";
import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import patientRoutes from "./patient.routes";
import appointmentRoutes from "./appointment.routes";
import crisisRoutes from "./crisis.routes";
import medicationRoutes from "./medication.routes";
import patientMedicationRoutes from "./patientMedication.routes";
import studyRoutes from "./study.routes";

const app = express();
app.use(express.json());
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/crisis", crisisRoutes);
router.use("/medications", medicationRoutes);
router.use("/patient-medications", patientMedicationRoutes);
router.use("/studies", studyRoutes);

export default router;


