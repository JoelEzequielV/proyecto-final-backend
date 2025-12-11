export async function addProduct(productData) {
  const { title, description, price, image } = productData;


  if (!title || typeof title !== "string" || title.trim().length < 3) {
    const err = new Error("El título es obligatorio y debe tener al menos 3 caracteres.");
    err.status = 400;
    throw err;
  }

  if (price === undefined) {
    const err = new Error("El precio es obligatorio.");
    err.status = 400;
    throw err;
  }

  const normalizedPrice = Number(price);
  if (Number.isNaN(normalizedPrice) || normalizedPrice <= 0) {
    const err = new Error("El precio debe ser un número mayor a 0.");
    err.status = 400;
    throw err;
  }

  if (description && description.length < 10) {
    const err = new Error("La descripción debe tener al menos 10 caracteres.");
    err.status = 400;
    throw err;
  }

  if (image && typeof image !== "string") {
    const err = new Error("La imagen debe ser una URL válida en formato string.");
    err.status = 400;
    throw err;
  }

  const product = {
    title: title.trim(),
    description: description || "",
    price: normalizedPrice,
    image: image || "",
    createdAt: new Date().toISOString()
  };

  return await productModel.createProduct(product);
}
