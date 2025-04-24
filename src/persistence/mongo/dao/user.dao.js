import { userModel } from "../models/user.model.js";

class UserDao {
  // Obtener todos los usuarios
  async getAll() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw new Error("Error al obtener los usuarios");
    }
  }

  // Obtener un usuario por una consulta específica
  async getOne(query) {
    try {
      const user = await userModel.findOne(query);
      return user;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw new Error("Error al obtener el usuario");
    }
  }

  // Crear un nuevo usuario
  async create(data) {
    try {
      const user = await userModel.create(data);
      return user;
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      throw new Error("Error al crear el usuario");
    }
  }

  // Actualizar un usuario por su ID
  async update(id, data) {
    try {
      const userUpdate = await userModel.findByIdAndUpdate(id, data, { new: true });
      return userUpdate;
    } catch (error) {
      console.error(`Error al actualizar el usuario con ID ${id}:`, error);
      throw new Error("Error al actualizar el usuario");
    }
  }

  // Eliminar un usuario por su ID
  async remove(id) {
    try {
      const user = await userModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
      throw new Error("Error al eliminar el usuario");
    }
  }
}

export const userDao = new UserDao();
