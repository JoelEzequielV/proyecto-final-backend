
import { getDB } from "../_lib/firebase.js";
import { verifyTokenFromHeader } from "../_lib/auth.js";

export default async function handler(req, res) {
  const db = getDB();
  const { id } = req.query || {};

  if (!id) return res.status(400).json({ message: "ID requerido" });

  try {
    if (req.method === "GET") {
      const doc = await db.collection("products").doc(id).get();
      if (!doc.exists) return res.status(404).json({ message: "Producto no encontrado" });
      return res.status(200).json({ id: doc.id, ...doc.data() });
    }

    if (req.method === "DELETE") {

      try {
        verifyTokenFromHeader(req);
      } catch (e) {
        return res.status(e.status || 401).json({ message: e.message });
      }

      const docRef = db.collection("products").doc(id);
      const doc = await docRef.get();
      if (!doc.exists) return res.status(404).json({ message: "Producto no encontrado" });
      await docRef.delete();
      return res.status(200).json({ message: "Producto eliminado" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("products/[id] error:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
}
