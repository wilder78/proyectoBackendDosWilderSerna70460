import express from "express";
import { config } from "../config/index.config.js";
import { connectMongoDB } from "../config/mongodb.config.js";
import router from "../router/router.js";

const initApp = () => {
  const app = express();
  
  // Conexión con la base de datos
  connectMongoDB();

  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Ruta para mostrar vista por default
  app.use(express.static(config.dirname + "./public"));

  // Rutas de conexión
  app.use("/api", router);



  return app;
};

export default initApp;
