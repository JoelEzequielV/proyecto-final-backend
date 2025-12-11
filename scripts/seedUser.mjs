
import bcrypt from "bcryptjs";
import { db } from "../src/firebase.js";
const email = "admin@empresa.com";
const password = "Admin123!";
const passwordHash = bcrypt.hashSync(password, 10);
async function run() {
  const ref = db.collection("users").doc();
  await ref.set({ email, passwordHash, role: "ADMIN", createdAt: new Date().toISOString() });
  console.log("Usuario seed creado:", email);
  process.exit(0);
}
run().catch(e=>{console.error(e); process.exit(1);});
