
import initApp from "./app/index.app.js";
import envsConfig from "./config/envs.config.js";
import { config } from "./config/index.config.js";

const app = initApp();

// Verificar que el puerto está definido antes de iniciar el servidor
const PORT = config.PORT || 8080;

const server = app.listen(PORT, () => {
  console.info(`Server listening on: http://localhost:${envsConfig.PORT}`);
});

// Manejar errores en el servidor
server.on("error", (err) => {
  console.error("Error en el servidor:", err.message);
});

// import initApp from "./app/index.app.js";
// import { config } from "./config/index.config.js";  // Usamos `config` directamente

// const app = initApp();

// // Asegurar que PORT tenga un valor válido
// const PORT = config.PORT || 3000;

// const server = app.listen(PORT, () => {
//   console.info(`Server running on: http://localhost:${PORT}`);
// });

// // Manejo mejorado de errores en el servidor
// server.on("error", (err) => {
//   console.error("Error en el servidor:", err.message);
//   console.error(err.stack); // Mostrar más detalles del error
// });