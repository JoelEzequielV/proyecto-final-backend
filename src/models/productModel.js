
import { db } from "../firebase.js";

const COLLECTION = "products";

export async function getAllProducts() {
  const snapshot = await db.collection(COLLECTION).get();
  const products = [];
  snapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

export async function getProductById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function createProduct(productData) {
  const docRef = await db.collection(COLLECTION).add(productData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function deleteProduct(id) {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;
  await docRef.delete();
  return true;
}
