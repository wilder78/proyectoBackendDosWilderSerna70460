import mongoose from "mongoose";

// Definir el nombre de la colección
const ticketCollection = "ticket";

// Definir el esquema del ticket
const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,  // Asegura que el código esté presente
    unique: true,    // Asegura que el código sea único
  },
  purchase_datatime: {
    type: Date,
    default: Date.now,  // Fecha y hora de la compra por defecto
  },
  amount: {
    type: Number,
    required: true,     // Asegura que el monto esté presente
    min: [0, "El monto no puede ser negativo"],  // Validación de monto
  },
  purchaser: {
    type: String,
    required: true,     // Asegura que el nombre del comprador esté presente
  },
});

// Crear el modelo a partir del esquema
export const ticketModel = mongoose.model(ticketCollection, ticketSchema);

