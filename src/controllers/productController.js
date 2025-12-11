
import * as productService from "../services/productService.js";

export async function getAll(req, res, next) {
  try {
    const products = await productService.listAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const product = await productService.getProduct(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    await productService.removeProduct(id);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    next(err);
  }
}
