// Archivo de configuración con las variables de entorno
export default {
  PORT: process.env.PORT || 4000,
  MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ecommerce",
  SESSION_SECRET: process.env.SESSION_SECRET || "secret",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  PERSISTENCE: process.env.PERSISTENCE,
};
