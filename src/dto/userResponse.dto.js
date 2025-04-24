// Clase que representa un DTO (Data Transfer Object) para la respuesta del usuario
export class UserResponseDto {
  constructor(user) {
    // Asignación de propiedades del objeto user a las propiedades del DTO
    this.fullName = `${user.first_name} ${user.last_name}`;  // Nombre completo concatenando los nombres y apellidos
    this.email = user.email;   // Correo electrónico del usuario
    this.age = user.age;       // Edad del usuario
    this.role = user.role;     // Rol del usuario (ej. 'admin', 'user', etc.)
  }

  // Método para calcular la edad del usuario en base a la fecha de nacimiento (actualmente comentado)
  age(user) {
    try {
      // Algoritmo para calcular la edad en base a la fecha de nacimiento
      // const now = Date.now();
      // const age = now - user.birthDate; //! No está bien, se debe hacer con una librería de fechas como 'moment' o 'date-fns'
      // return age;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}
