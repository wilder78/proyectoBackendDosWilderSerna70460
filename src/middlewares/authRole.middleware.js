export const authRole = (roles) => {
    return (req, res, next) => {
      try {
        // Ya no usamos req.session.user
        if (!req.user) {
          return res.status(401).json({ status: "error", message: "No autenticado" });
        }
  
        const userRole = req.user.role;
  
        // Permitir múltiples roles
        if (!Array.isArray(roles)) {
          roles = [roles];
        }
  
        if (!roles.includes(userRole)) {
          return res.status(403).json({ status: "error", message: "No está autorizado." });
        }
  
        next();
      } catch (error) {
        console.error("Error en authRole:", error);
        res.status(500).json({ status: "error", message: "Error interno del servidor" });
      }
    };
  };
 