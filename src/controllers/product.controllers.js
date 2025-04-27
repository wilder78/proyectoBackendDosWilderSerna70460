import { productDao } from "../persistence/mongo/dao/product.dao.js";
import { authRole } from "../middlewares/authRole.middleware.js"; // Middleware para validar roles

class ProductController {
  // Llamar la función de todos los productos con filtros y paginación
  async getAllProducts(req, res) {
    try {
      const { limit = 10, page = 1, sort, category, status } = req.query;

      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: { price: sort === "asc" ? 1 : -1 },
      };

      let query = {};
      if (category) query.category = category;
      if (status) query.status = status;

      const products = await productDao.getAll(query, options);
      res.status(200).json({ status: "ok", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching products", error });
    }
  }

  // Obtener producto por ID
  async getProductById(req, res) {
    try {
      const { pid } = req.params;

      const product = await productDao.getById(pid);

      if (!product) {
        return res
          .status(404)
          .json({ status: "Error", msg: "Producto no encontrado" });
      }

      res.status(200).json({ status: "ok", product });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  // Crear un producto (solo admin)
  async createProduct(req, res) {
    try {
      // Validar que el usuario tenga rol de admin
      if (!req.user || req.user.role !== "admin") {
        return res
          .status(403)
          .json({ status: "Error", msg: "Acceso no autorizado" });
      }

      const productData = req.body;
      const product = await productDao.create(productData);

      res.status(201).json({ status: "ok", product });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  // Actualizar un producto (solo admin)
  async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const productData = req.body;

      const product = await productDao.update(pid, productData);

      if (!product) {
        return res.status(404).json({
          status: "Error",
          msg: "Producto no encontrado",
        });
      }

      res.status(200).json({
        status: "ok",
        product,
      });
    } catch (error) {
      console.log(error); // Log de error para monitoreo

      res.status(500).json({
        status: "Error",
        msg: "Error interno del servidor", // Mensaje de error
      });
    }
  }

  // Eliminar un producto (solo admin)
  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;

      const product = await productDao.deleteOne(pid);

      if (!product) {
        return res.status(404).json({
          status: "Error",
          msg: "Producto no encontrado",
        });
      }

      res.status(200).json({
        status: "ok",
        msg: `El producto con el id ${pid} fue desactivado`,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: "Error",
        msg: "Error interno del servidor",
      });
    }
  }
}

export const productController = new ProductController();
