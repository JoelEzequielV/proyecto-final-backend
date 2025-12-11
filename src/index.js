import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import productsRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";
// import "./firebase.js"; // firebase se inicializa al importarse en otros módulos

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/products", productsRouter);
app.use("/auth", authRouter);

// 404 para rutas desconocidas
app.use(notFoundHandler);

// middleware de errores (debe ir al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server escuchando en http://localhost:${PORT}`);
});
