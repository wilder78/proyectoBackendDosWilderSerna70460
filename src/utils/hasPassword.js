import bcrypt from "bcrypt";

// Función para hashear el password
export const hasPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Función que compara los password
export const comparePassword = async (userPassword, receivedPassword) => {
    return await bcrypt.compare(receivedPassword, userPassword);
}
    
