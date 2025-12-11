
import jwt from "jsonwebtoken";
import { db } from "../firebase.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const USERS_COLLECTION = "users";

// para el ejercicio suponemos que hay una colección 'users' en Firestore
// cada documento con { email: string, passwordHash: string, role?: "ADMIN"|"USER" }

async function findUserByEmail(email) {
  const snapshot = await db.collection(USERS_COLLECTION).where("email", "==", email).limit(1).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son requeridos" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const payload = { uid: user.id, email: user.email, role: user.role || "USER" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "2h" });

    return res.json({ token: `Bearer ${token}` });
  } catch (err) {
    next(err);
  }
}
