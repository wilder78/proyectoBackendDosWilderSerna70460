import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { userExist } from "../middlewares/existUser.middleware.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await userDao.getAll();
    res.status(200).json({ status: "ok", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const user = await userDao.create(req.body);
    res.status(201).json({ status: "ok", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Obtener un usuario por ID
router.get("/:id", userExist, async (req, res) => {
  try {
    const user = await userDao.getOne({ _id: req.params.id });
    res.status(200).json({ status: "ok", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Eliminar un usuario por ID
router.delete("/:id", userExist, async (req, res) => {
  try {
    await userDao.remove(req.params.id);
    res.status(200).json({ status: "ok", message: `User with ID ${req.params.id} removed` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Actualizar un usuario por ID
router.put("/:id", userExist, async (req, res) => {
  try {
    const userUpdate = await userDao.update(req.params.id, req.body);
    res.status(200).json({ status: "ok", user: userUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;
