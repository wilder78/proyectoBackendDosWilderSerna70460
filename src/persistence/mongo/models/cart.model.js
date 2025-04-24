import mongoose from "mongoose";

// Definir el nombre de la colección
const cartCollection = "cart";

// Definir el esquema del carrito
const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true, // Asegura que cada producto esté presente
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "La cantidad debe ser al menos 1"], // Validación de cantidad mínima
      },
    },
  ],
});

// Crear el modelo a partir del esquema
export const cartModel = mongoose.model(cartCollection, cartSchema);


