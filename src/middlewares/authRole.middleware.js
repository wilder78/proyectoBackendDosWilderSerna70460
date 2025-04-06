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
  
  
// export const authRole = (roles) => {
//     return (req, res, next) => {
//         try {
//             // console.log(req.session.user);
//             if (!req.session.user) {
//                 return res.status(401).json({ status: "error", message: "No autenticado" });
//             }

//             const userRole = req.session.user.role;

//             // Permitir múltiples roles
//             if (!Array.isArray(roles)) {
//                 roles = [roles]; // Si roles es un string, conviértelo en array
//             }

//             if (!roles.includes(userRole)) {
//                 return res.status(403).json({ status: "error", message: "No está autorizado." });
//             }

//             next();
//         } catch (error) {
//             console.error("Error en authRole:", error);
//             res.status(500).json({ status: "error", message: "Error interno del servidor" });
//         }
//     };
// };

// export const authRole = (role) => {
//     return (req, res, next) => {
//         try {
//             if(!req.session.user) return res.status(400).json({ status: "error", message: "No autenticado"})
//             if(role !== req.session.user.role) return res.status(403).json({ status: "Error", message: "No esta autorizado."})

//             next();
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }