// Middleware para autenticar peticiones usando Passport.js
import passport from "passport";

export const passportCall = (strategy) => {
  return (req, res, next) => {
    
    // Usamos Passport para autenticar la solicitud según la estrategia proporcionada
    passport.authenticate(strategy, (err, user, info) => {
      // Si ocurre un error, lo pasamos al siguiente middleware o controlador
      if (err) return next(err);
      
      // Si no existe el usuario, respondemos con un error 401
      if (!user) return res.status(401).json({ status: "error", msg: info.message });

      // Si la autenticación es exitosa, agregamos el usuario a la solicitud
      req.user = user;
      next();
    })(req, res, next); // Ejecutamos el método de autenticación
  }
};
