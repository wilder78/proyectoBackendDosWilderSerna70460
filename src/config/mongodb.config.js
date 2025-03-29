import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/tu_base_de_datos", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1);
    }
};


// import mongoose from "mongoose";

// // Función de conexión a mongo 
// export const connectMongoDB = async () => {
//   try {

//     await mongoose.connect("mongodb://localhost:27017/70460");
//     console.log("MongoDB connected");
    
//   } catch (error) {
//     console.log("Error connecting to MongoDB: ", error);
//   }
// }