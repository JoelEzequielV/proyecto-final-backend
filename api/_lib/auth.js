
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";

if (!JWT_SECRET) {
  console.warn("WARNING: JWT_SECRET no definido en las env vars");
}

export function generateToken(payload) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET no configurado");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyTokenFromHeader(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) {
    const err = new Error("No autorizado: token faltante");
    err.status = 401;
    throw err;
  }
  const token = header.split(" ")[1];
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    const err = new Error("No autorizado: token inválido o expirado");
    err.status = 401;
    throw err;
  }
}
