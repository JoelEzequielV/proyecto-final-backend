
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("Falta GOOGLE_APPLICATION_CREDENTIALS en .env");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const db = admin.firestore();

export { admin, db };
