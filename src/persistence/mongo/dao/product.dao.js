import { productModel } from "../models/product.model.js";

class ProductDao {
  // Obtener todos los productos con paginación y filtros
  async getAll(query, options) {
    try {
      const products = await productModel.paginate(query, options);
      return products;
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  // Obtener un producto por ID
  async getById(id) {
    try {
      const product = await productModel.findById(id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      return product;
    } catch (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error.message);
      throw new Error(`Producto no encontrado: ${error.message}`);
    }
  }

  // Crear un nuevo producto
  async create(data) {
    try {
      const product = await productModel.create(data);
      return product;
    } catch (error) {
      console.error("Error al crear producto:", error.message);
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  // Actualizar un producto por ID
  async update(id, data) {
    try {
      const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
      if (!productUpdate) {
        throw new Error(`Producto con ID ${id} no encontrado para actualizar`);
      }
      return productUpdate;
    } catch (error) {
      console.error(`Error al actualizar producto con ID ${id}:`, error.message);
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  // Desactivar un producto (en lugar de eliminarlo completamente)
  async deleteOne(id) {
    try {
      const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado para desactivar`);
      }
      return product;
    } catch (error) {
      console.error(`Error al desactivar producto con ID ${id}:`, error.message);
      throw new Error(`Error al desactivar producto: ${error.message}`);
    }
  }
}

export const productDao = new ProductDao();

