import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import healthMetricRoutes from "./routes/healthMetricRoutes";
import goalRoutes from "./routes/goalRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import mealRoutes from "./routes/mealRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/api/users", userRoutes);
app.use("/api/metrics", healthMetricRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/meals", mealRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
