import mongoose from "mongoose";


// Función de conexion a mongo.
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};


// MONGO_URL
