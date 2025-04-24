import { ticketModel } from "../models/ticket.model.js";

class TicketDao {
  // Obtener todos los tickets
  async getAll() {
    try {
      const tickets = await ticketModel.find();
      return tickets;
    } catch (error) {
      console.error("Error al obtener los tickets:", error);
      throw new Error("Error al obtener los tickets");
    }
  }

  // Obtener un ticket por una consulta específica
  async getOne(query) {
    try {
      const ticket = await ticketModel.findOne(query);
      return ticket;
    } catch (error) {
      console.error("Error al obtener el ticket:", error);
      throw new Error("Error al obtener el ticket");
    }
  }

  // Crear un nuevo ticket
  async create(data) {
    try {
      const ticket = await ticketModel.create(data);
      return ticket;
    } catch (error) {
      console.error("Error al crear el ticket:", error);
      throw new Error("Error al crear el ticket");
    }
  }

  // Actualizar un ticket por su ID
  async update(id, data) {
    try {
      const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, { new: true });
      return ticketUpdate;
    } catch (error) {
      console.error(`Error al actualizar el ticket con ID ${id}:`, error);
      throw new Error("Error al actualizar el ticket");
    }
  }

  // Eliminar un ticket por su ID
  async remove(id) {
    try {
      const ticket = await ticketModel.findByIdAndDelete(id);
      return ticket;
    } catch (error) {
      console.error(`Error al eliminar el ticket con ID ${id}:`, error);
      throw new Error("Error al eliminar el ticket");
    }
  }
}

export const ticketDao = new TicketDao();
