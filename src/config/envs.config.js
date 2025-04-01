import dotenv from "dotenv";
dotenv.config();  

// console.log("MONGO_URL en envs.config.js:", process.env.MONGO_URL);

export default {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ecommerce"
};


