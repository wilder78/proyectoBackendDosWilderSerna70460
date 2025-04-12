import bcrypt from "bcrypt";

// Función para hashear el password
export const hasPassword = (password) => {
  const salt = bcrypt.genSaltSync(10); // esta es la versión sincrónica
  return bcrypt.hashSync(password, salt);
};

// Función que compara los password
export const comparePassword = (userPassword, receivedPassword) => {
  return bcrypt.compareSync(receivedPassword, userPassword);
};
