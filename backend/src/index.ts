import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ordersRouter from "./routes/orders";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//Rutas
app.use("/api/orders", ordersRouter);

app.listen(PORT, () => {
    console.log(`✅ Backend corriendo en http://localhost:${PORT}`)
});
