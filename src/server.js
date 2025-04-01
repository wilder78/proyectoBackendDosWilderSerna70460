import initApp from "./app/index.app.js";
import { config } from "./config/index.config.js";

const app = initApp();

// Verificar que el puerto está definido antes de iniciar el servidor
const PORT = config.PORT || 8080;

const server = app.listen(PORT, () => {
  console.info(`Server listening on: http://localhost:${PORT}`);
});

// Manejar errores en el servidor
server.on("error", (err) => {
  console.error("Error en el servidor:", err.message);
});

// import initApp from "./app/index.app.js";
// import { config } from "./config/index.config.js";

// const app = initApp();

// const server = app.listen(config.PORT, () => {
//   console.info(`Server listen on: http://localhost:${process.env.PORT}`);
// });
