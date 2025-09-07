import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRouter);

app.listen(4000, () => {
  console.log("✅ Backend corriendo en http://localhost:4000");
});
