import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { comparePassword, hasPassword } from "../utils/hasPassword.utils.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { createToken } from "../utils/jwt.utils.js";
import { checkTokenHeader } from "../middlewares/checkTokenHeader.middleware.js";
import { checkTokenCookie } from "../middlewares/checkTokenCookie.middleware.js";
import passport from "passport";

const router = Router();

// Metodo para validar usuario o logearse.
router.post("/login", passport.authenticate("login"), async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", message: "Internal Server Error." });
  }
});

// Metodo para registrar usuarios.
router.post(
  "/register",
  passport.authenticate("register"),
  async (req, res) => {
    try {
      res.status(201).json({ message: req.user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
);

// Verificar que el usuario está autenticado con JWT
router.get(
  "/profile",
  checkTokenCookie,
  authRole(["admin", "user"]),
  async (req, res) => {
    try {
      res.status(200).json({ user: req.user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
);

// Cerrar login.
router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Session cerrada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;
