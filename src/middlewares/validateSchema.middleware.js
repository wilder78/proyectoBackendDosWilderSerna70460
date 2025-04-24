// Middleware para validar los datos de la solicitud usando un esquema proporcionado
export const validateSchema = (schema) => {
  return (req, res, next) => {
    const errors = [];

    // Validar el cuerpo de la solicitud
    if (schema.body) {
      const result = schema.body.safeParse(req.body);

      // Si hay errores en el cuerpo, los agregamos al array de errores
      if (!result.success) {
        errors.push(
          ...result.error.errors.map((err) => ({
            field: `body.${err.path.join(".")}`,
            message: err.message,
          }))
        );
      }
    }

    // Validar los parámetros de la URL
    if (schema.params) {
      const result = schema.params.safeParse(req.params);
      // Si hay errores en los parámetros, los agregamos al array de errores
      if (!result.success) {
        errors.push(
          ...result.error.errors.map((err) => ({
            field: `params.${err.path.join(".")}`,
            message: err.message,
          }))
        );
      }
    }

    // Validar las consultas en la URL
    if (schema.query) {
      const result = schema.query.safeParse(req.query);
      // Si hay errores en las consultas, los agregamos al array de errores
      if (!result.success) {
        errors.push(
          ...result.error.errors.map((err) => ({
            field: `query.${err.path.join(".")}`,
            message: err.message,
          }))
        );
      }
    }

    // Si encontramos errores, respondemos con un error 400
    if (errors.length > 0) return res.status(400).json({ errors });

    // Si no hay errores, continuamos al siguiente middleware o controlador
    next();
  };
};
