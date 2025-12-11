
import express from "express";
import * as productController from "../controllers/productController.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", productController.getAll); // GET /api/products
router.get("/:id", productController.getById); // GET /api/products/:id

// proteger creación y eliminación
router.post("/create", authenticate, productController.create); // POST /api/products/create
router.delete("/:id", authenticate, productController.remove); // DELETE /api/products/:id

export default router;
