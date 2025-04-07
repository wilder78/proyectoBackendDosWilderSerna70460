import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { comparePassword, hasPassword } from "../utils/hasPassword.utils.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { createToken } from "../utils/jwt.utils.js";
import { checkTokenHeader } from "../middlewares/checkTokenHeader.middleware.js";

const router = Router();

// Metodo para validar usuario o logearse.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getOne({ email });
    // console.log(await comparePassword(user.password, password));
    
    if (!user || !comparePassword(user.password, password)) 
      return res.status(401).json({ message: "Email o password invalido" });

    // Crear un token
    const tokenInfo = {
      _id: user._id,
      email: user.email,
      role: user.role
    }

    const token = createToken(tokenInfo);

    res.status(200).json({user, token});
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});


// Metodo para registrar usuarios.
router.post("/register", async (req, res) => {
  try {
    // console.log("Cuerpo recibido en /register:", req.body); //
    const { email, password } = req.body;

    // Verificar que el password fue enviado
    if (!password) {
      return res.status(400).json({ message: "El password es obligatorio" });
    }

    // Verificar si el usuario ya existe
    const user = await userDao.getOne({ email });
    if (user) {
      return res.status(400).json({ message: "Ya hay un usuario registrado con ese email" });
    }

    // Hashear el password
    const newUserData = {
      ...req.body,
      password: hasPassword(password),
    };

    // Crear un nuevo usuario
    const newUser = await userDao.create(newUserData);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});


// Verificar que el usuario está autenticado con JWT
router.get("/profile", checkTokenHeader, authRole(["admin", "user"]), async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "No hay usuario logueado" });

    res.status(200).json({ user: req.session.user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});


// Cerrar login.
router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Session cerrada"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;
