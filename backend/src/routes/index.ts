// src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth.routes";
import patientRoutes from "./patient.routes";
import appointmentRoutes from "./appointment.routes";
import medicationRoutes from "./medication.routes";
import patientMedicationRoutes from "./patientMedication.routes";
import studyRoutes from "./study.routes";
import vitalRoutes from "./vital.routes";
import crisisRoutes from "./crisis.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/medications", medicationRoutes);
router.use("/patient-medications", patientMedicationRoutes);
router.use("/studies", studyRoutes);
router.use("/vitals", vitalRoutes);
router.use("/crisis", crisisRoutes);

export default router;
