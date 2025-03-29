import express from "express";
import { config } from "../config/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const initApp = () => {
  const app = express();

  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Ruta para mostrar vista por default
  app.use(express.static(config.dirname + "./public"));

  // Middleware para manejar cookies firmadas
  app.use(cookieParser("miClaveSecreta"));

  // Middelware para manejar la session
  app.use(
    session({
      secret: "secreto-super-seguro", // Clave para fimar la cookie
      resave: true, // Evita guardar la sesión si no hay cambios.
      saveUninitialized: true, // Guarda sesiones vacías
      cookie: { secure: false }, // Debe estar en true si usas HTTPS
    })
  );

  // Ruta que almacena datos en una seción
  app.get("/set-session", (req, res) => {
    // Definir la session
    req.session.usuario = { nombre: "Mauricio", rol: "admin" };
    res.send("Session guardada");
  });

  // Ruta que obtiene datos de la sesión
  app.get("/get-session", (req, res) => {
    const sessionData = req.session.usuario;
    if (sessionData) {
      res.send(`Usuario: ${sessionData.nombre}, Rol: ${sessionData.rol}`);
    } else {
      res.send("No hay sesiones activas");
    }
  });

  // Ruta para destruir la session
  app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Sesión cerrada");
  });

  return app;
};

export default initApp;
