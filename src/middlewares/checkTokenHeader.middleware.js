import { verifyToken } from "../utils/jwt.utils.js";
import { userDao } from "../persistence/mongo/dao/user.dao.js";

export const checkTokenHeader = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No se provee un token." });

    const token = authHeader.split(" ")[1];

    const decode = verifyToken(token);
    // console.log(decode);

    const user = await userDao.getOne({ _id: decode._id });
    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });

    // Agregamos a la request el usuario.
    req.user = user;

    // Aquí guardamos el usuario en la sesión
    req.session.user = {
      _id: user._id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

