import { userDao } from "../persistence/mongo/dao/user.dao.js";

class UserController {
  // Obtener todos los usuarios
  async getAllUsers(req, res) {
    try {
      const users = await userDao.getAll();

      res.status(200).json({ status: "ok", users });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  // Crear un nuevo usuario
  async createUser(req, res) {
    try {
      const userData = req.body;

      const user = await userDao.create(userData);

      res.status(201).json({ status: "ok", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }

  // Obtener un usuario por ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userDao.getOne({ _id: id });
      res.status(200).json({ status: "ok", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }

  // Eliminar un usuario por ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userDao.remove(id);
      res
        .status(200)
        .json({ status: "ok", message: `User with ID ${id} removed` });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }

  // Actualizar un usuario por ID
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;

      const userUpdate = await userDao.update(id, userData);

      res.status(200).json({ status: "ok", user: userUpdate });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
}

export const userController = new UserController();
