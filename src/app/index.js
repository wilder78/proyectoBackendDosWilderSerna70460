import express from "express";
import { config } from "../config/index.js";
import { connectDB } from "../config/mongodb.config.js";
import router from "../router/auth.routes.js";
import session from "express-session";

const initApp = () => {
  const app = express();

  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Ruta para mostrar vista por default
  app.use(express.static(config.dirname + "./public"));

  // Middelware para manejar la session
  app.use(
    session({
      secret: "secreto-super-seguro", // Clave para fimar la cookie
      resave: true, // Evita guardar la sesión si no hay cambios.
      saveUninitialized: true, // Guarda sesiones vacías
      cookie: { secure: false }, // Debe estar en true si usas HTTPS
    })
  );

  return app;
};

export default initApp;
