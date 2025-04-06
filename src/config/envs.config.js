// import dotenv from "dotenv";
// dotenv.config();  


export default {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ecommerce",
    SEEEION_SECRET: process.env.SEEEION_SECRET || "secret",
    JWT_SECRET: process.env.JWT_SECRET || "secret"
};


