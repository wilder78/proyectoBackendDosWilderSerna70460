import { Router } from "express";
import { userExist } from "../middlewares/existUser.middleware.js";
import { userController } from "../controllers/user.controllers.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", userController.getAllUsers);

// Crear un nuevo usuario
router.post("/", userController.createUser);

// Obtener un usuario por ID
router.get("/:id", userExist, userController.getUserById);

// Eliminar un usuario por ID
router.delete("/:id", userExist, userController.deleteUser);

// Actualizar un usuario por ID
router.put("/:id", userExist, userController.updateUser);

export default router;
