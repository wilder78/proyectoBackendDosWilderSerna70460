import { productModel } from "../models/product.model.js";

class ProductDao {
  // Obtener todos los productos con paginación y filtros
  async getAll(query, options) {
    try {
      const products = await productModel.paginate(query, options);
      return products;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw new Error("Error al obtener productos");
    }
  }

  // Obtener un producto por ID
  async getById(id) {
    try {
      const product = await productModel.findById(id);
      return product;
    } catch (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error);
      throw new Error("Producto no encontrado");
    }
  }

  // Crear un nuevo producto
  async create(data) {
    try {
      const product = await productModel.create(data);
      return product;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw new Error("Error al crear producto");
    }
  }

  // Actualizar un producto por ID
  async update(id, data) {
    try {
      const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
      return productUpdate;
    } catch (error) {
      console.error(`Error al actualizar producto con ID ${id}:`, error);
      throw new Error("Error al actualizar producto");
    }
  }

  // Desactivar un producto (en lugar de eliminarlo completamente)
  async deleteOne(id) {
    try {
      const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
      return product;
    } catch (error) {
      console.error(`Error al desactivar producto con ID ${id}:`, error);
      throw new Error("Error al desactivar producto");
    }
  }
}

export const productDao = new ProductDao();
