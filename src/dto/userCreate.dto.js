// Clase que representa un DTO (Data Transfer Object) para la creación de un usuario
export class UserCreateDto {
  constructor(user) {
    // Asignación de propiedades del objeto user a las propiedades del DTO
    this.first_name = user.first_name;   // Primer nombre del usuario
    this.last_name = user.last_name;     // Apellido del usuario
    this.fullName = `${this.first_name} ${this.last_name}`;  // Nombre completo concatenando los nombres y apellidos
    this.email = user.email;             // Correo electrónico del usuario
    this.password = user.password;       // Contraseña del usuario
    this.birthDate = user.birthDate;     // Fecha de nacimiento del usuario
  }
}

