import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { editProductSchema } from "../schemas/products.schema.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { productController } from "../controllers/product.controllers.js";

const router = Router();

// Obtener todos los productos con filtros
router.get("/", productController.getAllProducts);

// Obtener producto por ID
router.get("/:pid", productController.getProductById);

// Ruta para crear un nuevo producto (solo accesible para admins)
router.post(
  "/",
  authRole(["admin"]),
  validateSchema(editProductSchema),
  productController.createProduct
);

// Ruta para actualizar un producto (solo accesible para admins)
router.put(
  "/:pid",
  validateSchema(editProductSchema),
  authRole(["admin"]),
  productController.updateProduct
);

// Ruta para eliminar un producto (solo accesible para admins)
router.delete("/:pid", authRole(["admin"]), productController.deleteProduct);

export default router;
