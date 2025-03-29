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

  // Middelware para manejar cookies firmadas.
  app.use(cookieParser("miClaveSecreta"));

  // Setear una cookie
  app.get("/set-cookie", (req, res) => {
    // Crear una cookie.
    res.cookie("name", "Juan Perez");
    res.send("Cookie guardada");
  });

  // obtener una cookie
  app.get("/get-cookie", (req, res) => {
    // Obtener cookie.
    const cookie = req.cookies.name;
    res.send(cookie);
  });

  // Ruta para establecer una cookie con httpOnly
  app.get("/set-httponly-cookie", (req, res) => {
    res.cookie("sessionID", "abcdef123456", {
      maxAge: 3600000,
      httpOnly: true,
    });
    res.send("Cookie httpOnly establecida");
  });

  // Ruta para leer una cookie con httpOnly
  app.get("/get-httponly-cookie", (req, res) => {
    const sessionID = req.cookies.sessionID;
    res.send(
      sessionID
        ? `ID de sesión: ${sessionID}`
        : "No hay cookies de sesión establecidas"
    );
  });

  // Ruta para eliminar una cookie httpOnly
  app.get("/delete-httponly-cookie", (req, res) => {
    res.clearCookie("sessionID");
    res.send("Cookie httpOnly eliminada");
  });

  app.get('/set-secure-signed-cookie', (req, res) => {
    res.cookie('secureToken', 'randomSecureToken123', {
        maxAge: 5000, 
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        signed: true
    });
    res.send('Cookie segura y firmada establecida');
  });

  app.get('/get-secure-signed-cookie', (req, res) => {
  const secureToken = req.signedCookies.secureToken;
  res.send(secureToken ? `Token validado: ${secureToken}` : 'No hay token válido');
});

  return app;
};

export default initApp;
// /get-httponly-cookie
