import mongoose from "mongoose";
import dotenv from "dotenv";  
import envsConfig from "./envs.config.js";

dotenv.config(); 

// Función de conexión a MongoDB
export const connectMongoDB = async () => {
    try {
        console.log("Conectando a MongoDB con URL:", envsConfig.MONGO_URL);  // Verifica la URL antes de conectar

        await mongoose.connect(envsConfig.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB conectado exitosamente");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error.message);
        process.exit(1);
    }
};



