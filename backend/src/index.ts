import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend funcionando 🚀" });
});

app.listen(4000, () => {
  console.log("✅ Backend corriendo en http://localhost:4000");
});
