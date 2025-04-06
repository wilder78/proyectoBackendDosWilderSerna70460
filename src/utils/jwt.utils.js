import jwt from "jsonwebtoken";
import envsConfig from "../config/envs.config.js";

// Función que crea el token
export const createToken = (data) => {
    return jwt.sign(data, envsConfig.JWT_SECRET, { expiresIn: "5m" });
};

// Función que verifica (decodifica) el token
export const verifyToken = (token) => {    
    return jwt.verify(token, envsConfig.JWT_SECRET);
};

// if (!token) {
//     throw new Error("Token no proporcionado");
// }
// import jwt from "jsonwebtoken"
// import envsConfig from "../config/envs.config.js"

// // Función que crea el token
// export const createToken = (data) => {
//     return jwt.sign( data, envsConfig.JWT_SECRET, { expiresIn: "5m"});
// }


// // Función que verifica el token
// export const verifyToken = () => {
//     return jwt.verify(token, envsConfig.JWT_SECRET);
// } 