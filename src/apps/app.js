import express from "express";
import { connectMongoDB } from "../config/mongoDB.config.js";
import routes from "../routes/router.js";
import envsConfig from "../config/envs.config.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "../config/passport/passport.config.js";
import cors from "cors";


const app = express();

// Conexión a MongoDB
connectMongoDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // <<-- corrección: solo pones la carpeta, no el archivo html específico
app.use(cors());
app.use(cookieParser());

// Configurar sesión
app.use(
  session({
    secret: envsConfig.SESSION_SECRET,
    resave: false, // Mejor práctica: no guardar si no hay cambios
    saveUninitialized: false, // Mejor práctica: no guardar sesiones vacías
    cookie: { secure: false, maxAge: 500000 }, // Secure true si es HTTPS
  })
);

// Inicializar Passport
app.use(passport.initialize());

// Rutas principales
app.use("/api", routes);


// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

// Iniciar servidor
app.listen(envsConfig.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envsConfig.PORT}`);
});
