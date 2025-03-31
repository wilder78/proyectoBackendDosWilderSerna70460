import mongoose from "mongoose";


// Función de conexion a mongo.
export const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};


