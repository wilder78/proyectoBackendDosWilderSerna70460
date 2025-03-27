import express from "express";
import { config } from "../config/index.js";
import cookieParser from "cookie-parser";

const initApp = () => {
  const app = express();
  
  //Para poder trabajar con JSON y que se parseen correctamente a formatos de objeto
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Ruta para mostrar vista por default
  app.use(express.static(config.dirname + "./public"));
  


  return app;
};

export default initApp;
