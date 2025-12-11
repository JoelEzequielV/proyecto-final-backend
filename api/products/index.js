
import { getDB } from "../_lib/firebase.js";
import { verifyTokenFromHeader } from "../_lib/auth.js";

export default async function handler(req, res) {
  const db = getDB();

  try {
    if (req.method === "GET") {
      const snapshot = await db.collection("products").get();
      const products = [];
      snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
      return res.status(200).json(products);
    }

    if (req.method === "POST") {

      try {
        verifyTokenFromHeader(req);
      } catch (e) {
        return res.status(e.status || 401).json({ message: e.message });
      }

      const { title, description = "", price, image = "" } = req.body || {};

      if (!title || typeof title !== "string" || title.trim().length < 3) {
        return res.status(400).json({ message: "El título es obligatorio y debe tener al menos 3 caracteres." });
      }
      if (price === undefined) return res.status(400).json({ message: "El precio es obligatorio." });
      const normalizedPrice = Number(price);
      if (Number.isNaN(normalizedPrice) || normalizedPrice <= 0) {
        return res.status(400).json({ message: "El precio debe ser un número mayor a 0." });
      }
      if (description && description.length < 10) return res.status(400).json({ message: "La descripción debe tener al menos 10 caracteres." });

      const docRef = await db.collection("products").add({
        title: title.trim(),
        description,
        price: normalizedPrice,
        image,
        createdAt: new Date().toISOString()
      });

      const createdDoc = await docRef.get();
      return res.status(201).json({ id: createdDoc.id, ...createdDoc.data() });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("products/index error:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
}
