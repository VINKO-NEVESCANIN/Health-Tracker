import express from "express";
import { PrismaClient } from '@prisma/client';
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 🚀 Rutas de usuarios
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(user);
  } catch (error: any) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { events: true } });
  res.json(users);
});

// 🚀 Rutas de eventos
app.post("/api/events", async (req, res) => {
  try {
    const { description, intensity, userId } = req.body;
    const event = await prisma.event.create({
      data: {
        description,
        intensity: Number(intensity),
        userId: userId || null, // ✅ ahora puede ir vacío
      },
    });
    res.json(event);
  } catch (error: any) {
    console.error("Error creando evento:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/events", async (req, res) => {
  const events = await prisma.event.findMany({
    include: { user: true },
    orderBy: { timestamp: "desc" },
  });
  res.json(events);
});

// 🔌 Iniciar servidor
app.listen(4000, () => {
  console.log("✅ Backend corriendo en http://localhost:4000");
});
