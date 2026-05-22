import express from "express";
import cors from "cors";
import usuarioRouter from "./router/usuario.route.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', usuarioRouter);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

export default app;