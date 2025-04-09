import express from "express";
import { config } from "../config/index.config.js";
import { connectMongoDB } from "../config/mongodb.config.js";
import router from "../router/router.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "../config/passport/passport.config.js";

const initApp = () => {
  const app = express();

  // Conexión con la base de datos
  connectMongoDB();
  
  // console.log(process.env.PORT);
  

  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Ruta para mostrar vista por default
  app.use(express.static(config.dirname + "./public"));
  
  // Middelware para manejar la session
  app.use(
    session({
      secret: "SESSION_SECRET", // Clave para fimar la cookie
      resave: true, // Evita guardar la sesión si no hay cambios.
      saveUninitialized: true, // Guarda sesiones vacías
      cookie: { secure: false, maxAge: 50000 }, // Debe estar en true si usas HTTPS
    })
  );

  // Cookies de solicitud.
  app.use(cookieParser());

  // Inicializar las estrategias de passport
  app.use(passport.initialize());

  // Rutas de conexión
  app.use("/api", router);


  return app;
};

export default initApp;
