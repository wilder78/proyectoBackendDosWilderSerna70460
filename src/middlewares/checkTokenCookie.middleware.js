// Middleware para verificar el token en las cookies y validar al usuario
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { verifyToken } from "../utils/jwt.js";

export const checkTokenCookie = async (req, res, next) => {
  try {
    // Obtenemos el token desde las cookies
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "No se provee el token" });

    // Verificamos el token y decodificamos su contenido
    const decoded = verifyToken(token);
    const user = await userDao.getOne({ _id: decoded._id });
    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });

    // Si todo es válido, agregamos el usuario al request
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
