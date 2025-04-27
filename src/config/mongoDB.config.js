import mongoose from "mongoose";  // Importamos mongoose para la conexión a la base de datos MongoDB
import envsConfig from "./envs.config.js";  // Importamos las configuraciones de entorno

// Función para conectar con la base de datos MongoDB
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(envsConfig.MONGO_URL); 
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}


