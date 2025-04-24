// Middleware para verificar si el usuario existe en la base de datos
import { userDao } from "../persistence/mongo/dao/user.dao.js";

export const userExist = async (req, res, next) => {
  // Buscamos al usuario por su ID en los parámetros de la URL
  const user = await userDao.getOne({ _id: req.params.id });
  
  // Si no encontramos al usuario, respondemos con un error 404
  if (!user) return res.status(404).json({ status: "error", message: "User not found" });

  // Si el usuario existe, pasamos al siguiente middleware o controlador
  next();
};
