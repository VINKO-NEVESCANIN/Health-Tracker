import express from "express";
import cors from "cors";
import eventosRoutes from "./routes/eventos.routes";
import pacientesRoutes from "./routes/pacientes";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/eventos", eventosRoutes);

app.listen(4000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:4000");
});
