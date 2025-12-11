import { getDB } from "../_lib/firebase.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email y password son requeridos" });

    const db = getDB();
    const q = await db.collection("users").where("email", "==", email).limit(1).get();
    if (q.empty) return res.status(401).json({ message: "Credenciales inválidas" });

    const doc = q.docs[0];
    const user = { id: doc.id, ...doc.data() };
    const match = await bcrypt.compare(password, user.passwordHash || "");

    if (!match) return res.status(401).json({ message: "Credenciales inválidas" });

    const payload = { uid: user.id, email: user.email, role: user.role || "USER" };
    const token = generateToken(payload);
    return res.status(200).json({ token: `Bearer ${token}` });
  } catch (err) {
    console.error("auth/login error:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
}
