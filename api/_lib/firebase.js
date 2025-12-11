
import admin from "firebase-admin";


function parseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!raw) return null;


  const s = raw.trim();
  if (s.startsWith("{")) {
    return JSON.parse(s);
  }


  try {
    const decoded = Buffer.from(s, "base64").toString("utf8");
    if (decoded.trim().startsWith("{")) return JSON.parse(decoded);
  } catch (e) {
    // ignore
  }

  try {
    return JSON.parse(decodeURIComponent(s));
  } catch (e) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT no es JSON válido ni base64(JSON)");
  }
}

export function getDB() {
  if (!admin.apps.length) {
    const serviceAccount = parseServiceAccount();
    if (!serviceAccount) {

      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {

        const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        const key = require(path);
        admin.initializeApp({ credential: admin.credential.cert(key) });
      } else {
        throw new Error("No se encontró credencial de Firebase. Configure FIREBASE_SERVICE_ACCOUNT o GOOGLE_APPLICATION_CREDENTIALS");
      }
    } else {
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }
  }
  return admin.firestore();
}
