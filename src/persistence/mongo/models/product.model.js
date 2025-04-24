import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Definir el nombre de la colección
const productCollection = "product";

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Asegura que el título esté presente
  },
  description: {
    type: String,
    required: true,  // Asegura que la descripción esté presente
  },
  price: {
    type: Number,
    required: true,  // Asegura que el precio esté presente
    min: [0, "El precio no puede ser negativo"],  // Validación de precio
  },
  thumbnail: {
    type: [String],  // Asegura que sea un array de cadenas (URLs de imágenes)
    default: [],
  },
  code: {
    type: String,
    required: true,  // Asegura que el código esté presente
    unique: true,  // Asegura que el código sea único
  },
  stock: {
    type: Number,
    required: true,  // Asegura que el stock esté presente
    min: [0, "El stock no puede ser negativo"],  // Validación de stock
  },
  category: {
    type: String,
    required: true,  // Asegura que la categoría esté presente
  },
  status: {
    type: Boolean,
    default: true,  // Estado por defecto es 'true' (activo)
  }
});

// Aplicar la paginación al esquema
productSchema.plugin(mongoosePaginate);

// Crear el modelo a partir del esquema
export const productModel = mongoose.model(productCollection, productSchema);
