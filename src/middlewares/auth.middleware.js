
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado: token faltante" });
    }
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // podés adjuntar info del usuario al request
    req.user = payload;
    next();
  } catch (err) {
    // token inválido o expirado
    return res.status(401).json({ message: "No autorizado: token inválido o expirado" });
  }
}
