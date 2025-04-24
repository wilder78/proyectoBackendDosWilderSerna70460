import { Router } from "express";
import { productDao } from "../persistence/mongo/dao/product.dao.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { editProductSchema } from "../schemas/products.schema.js";
import { authRole } from "../middlewares/authRole.middleware.js";

const router = Router();

// Obtener todos los productos con filtros
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category, status } = req.query;

    const options = {
      limit,
      page,
      sort: { price: sort === "asc" ? 1 : -1 },
      learn: true,
    };

    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const products = await productDao.getAll(query, options);
    res.status(200).json({ status: "ok", products });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Obtener producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", product });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Crear un producto (solo admin)
router.post("/", authRole(["admin"]), async (req, res) => {
  try {
    const productData = req.body;
    const product = await productDao.create(productData);

    res.status(201).json({ status: "ok", product });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Actualizar un producto (solo admin)
router.put("/:pid", validateSchema(editProductSchema), authRole(["admin"]), async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;

    const product = await productDao.update(pid, productData);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", product });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

// Eliminar un producto (solo admin)
router.delete("/:pid", authRole(["admin"]), async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.deleteOne(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", msg: `El producto con el id ${pid} fue eliminado` });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

export default router;

