import mongoose from "mongoose";

// Definir el nombre de la colección
const userCollection = "users";

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,  // Asegura que el primer nombre esté presente
  },
  last_name: {
    type: String,
    required: true,  // Asegura que el apellido esté presente
  },
  email: {
    type: String,
    required: true,   // Asegura que el correo esté presente
    unique: true,     // Asegura que el correo sea único
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un correo electrónico válido'],  // Validación de formato de correo
  },
  password: {
    type: String,
    required: true,  // Asegura que la contraseña esté presente
  },
  age: {
    type: Number,
    min: [18, "La edad debe ser mayor o igual a 18"],  // Validación de edad mínima
  },
  role: {
    type: String,
    default: "user",  // Valor por defecto para el rol
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
});

// Crear índice en el correo para mejorar la eficiencia de las búsquedas
userSchema.index({ email: 1 });

// Crear el modelo a partir del esquema
export const userModel = mongoose.model(userCollection, userSchema);
