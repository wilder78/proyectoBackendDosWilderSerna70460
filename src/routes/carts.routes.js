import { Router } from "express";
import { cartController } from "../controllers/cart.controllers.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";

const router = Router();

// Crear un carrito
router.post("/", cartController.createCart);

// Obtener carrito por ID
router.get("/:cid", cartController.getCartById);

// Agregar producto al carrito (requiere autenticación y rol de usuario)
router.post(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authRole(["user"]),
  cartController.addProductToCart
);

// Eliminar producto del carrito
router.delete("/:cid/product/:pid", cartController.deleteProductToCart);

// Actualizar cantidad de un producto en el carrito
router.put("/:cid/product/:pid", cartController.updateQuantityProductInCart);

// Vaciar el carrito
router.delete("/:cid", cartController.clearProductsToCart);

// Finalizar compra (requiere autenticación y rol de usuario)
router.get(
  "/:cid/purchase",
  passportCall("jwt"),
  authRole(["user"]),
  cartController.purchaseCart
);

export default router;
