import bcrypt from "bcrypt";

// Función para hashear el password
export const hasPassword = (password) => {
    const salt = bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
};

// Función que compara los password
export const comparePassword = (userPassword, receivedPassword) => {
    return bcrypt.compareSync(receivedPassword, userPassword);
}
    
