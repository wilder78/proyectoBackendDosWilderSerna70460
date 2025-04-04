import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { comparePassword, hasPassword } from "../utils/hasPassword.js";
import { authRole } from "../middlewares/authRole.middleware.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getOne({ email });
    // console.log(await comparePassword(user.password, password));
    
    if (!user || !(await comparePassword(user.password, password))) 
      return res.status(401).json({ message: "Email o password invalido" });

    // Eliminamos la contraseña del objeto usuario
    delete user.password;

    // Guardamos la información del usuario en las session
    req.session.user = user;
    // console.log(req.session.user);

    res.status(200).json(user);
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
      password: await hasPassword(password),
    };

    // Crear un nuevo usuario
    const newUser = await userDao.create(newUserData);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});


router.get("/profile", authRole(["admin", "user"]), async (req, res) => {
  try {
    if(!req.session.user) return res.status(401).json({ message: "No hay usuario logueado"});
    res.status(200).json({ user: req.session.user})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
})

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

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userDao.getOne({ email, password });
//     if (!user)
//       return res.status(401).json({ message: "Email o password invalido" });

//     // Eliminamos la contraseña del objeto usuario
//     delete user.password;

//     // Guardamos la información del usuario en las session
//     req.session.user = user;

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error en /login:", error);
//     res.status(500).json({ status: "error", message: "Internal Server Error" });
//   }
// });