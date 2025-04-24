import { cartModel } from "../models/cart.model.js";

class CartDao {
  // Obtener todos los carritos
  async getAll() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.error("Error al obtener carritos:", error);
      throw new Error("Error al obtener carritos");
    }
  }

  // Obtener un carrito por su ID, incluyendo los productos
  async getById(id) {
    try {
      const cart = await cartModel.findById(id).populate("products.product");
      return cart;
    } catch (error) {
      console.error(`Error al obtener carrito con ID ${id}:`, error);
      throw new Error("Carrito no encontrado");
    }
  }

  // Crear un nuevo carrito
  async create() {
    try {
      const cart = await cartModel.create({});
      return cart;
    } catch (error) {
      console.error("Error al crear carrito:", error);
      throw new Error("Error al crear carrito");
    }
  }

  // Actualizar un carrito por su ID
  async update(id, data) {
    try {
      const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
      return cartUpdate;
    } catch (error) {
      console.error(`Error al actualizar carrito con ID ${id}:`, error);
      throw new Error("Error al actualizar carrito");
    }
  }

  // Eliminar un carrito por su ID
  async deleteOne(id) {
    try {
      const cart = await cartModel.deleteOne({ _id: id });
      return cart;
    } catch (error) {
      console.error(`Error al eliminar carrito con ID ${id}:`, error);
      throw new Error("Error al eliminar carrito");
    }
  }
}

export const cartDao = new CartDao();

