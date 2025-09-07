import { Router } from "express";

const router = Router();

let events: { id: number; description: string; date: string }[] = [];

// Obtener todos los eventos
router.get("/", (req, res) => {
  res.json(events);
});

// Crear un evento
router.post("/", (req, res) => {
  const { description } = req.body;
  const newEvent = {
    id: Date.now(),
    description,
    date: new Date().toISOString(),
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

export default router;
