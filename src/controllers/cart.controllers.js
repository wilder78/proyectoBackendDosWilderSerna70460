import { request, response } from "express";
import { cartDao } from "../persistence/mongo/dao/cart.dao.js";
import { cartServices } from "../services/cart.services.js";
import { productDao } from "../persistence/mongo/dao/product.dao.js";
import { errorLog } from "../utils/errorLog.js";
import { ticketService } from "../services/ticket.services.js";

class CartControllers {
  
  // Método para crear un carrito de compras
  async createCart(req = request, res = response) {
    try {
      // Llamamos al servicio para crear un nuevo carrito
      const cart = await cartServices.createCart();
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      // Si ocurre un error, lo logueamos y respondemos con un error interno
      errorLog(error, req);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  // Método para obtener un carrito por su ID
  async getCartById(req = request, res = response) {
    try {
      const { cid } = req.params;  // Extraemos el ID del carrito desde los parámetros de la URL
      const cart = await cartServices.getCartById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
      
      res.status(200).json({ status: "ok", cart });
    } catch (error) {
      // Manejo de errores
      errorLog(error, req);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  // Método para agregar un producto al carrito
  async addProductToCart(req = request, res = response) {
    try {
      const { cid, pid } = req.params; // Extraemos los IDs del carrito y del producto
      const product = await productDao.getById(pid); // Verificamos si el producto existe
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      
      const cart = await cartServices.getCartById(cid); // Verificamos si el carrito existe
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

      const cartUpdate = await cartServices.addProductToCart(cid, pid); // Llamamos al servicio para agregar el producto al carrito
      res.status(200).json({ status: "ok", payload: cartUpdate });
    } catch (error) {
      // Manejo de errores
      errorLog(error, req);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  // Método para eliminar un producto del carrito
  async deleteProductToCart(req = request, res = response) {
    try {
      const { cid, pid } = req.params;  // Extraemos los IDs del carrito y del producto
      const product = await productDao.getById(pid); // Verificamos si el producto existe
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      
      const cart = await cartDao.getById(cid); // Verificamos si el carrito existe
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

      const cartUpdate = await cartServices.deleteProductToCart(cid, pid); // Llamamos al servicio para eliminar el producto del carrito
      res.status(200).json({ status: "ok", payload: cartUpdate });
    } catch (error) {
      // Manejo de errores
      errorLog(error, req);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  // Método para actualizar la cantidad de un producto en el carrito
  async updateQuantityProductInCart(req = request, res = response) {
    try {
      const { cid, pid } = req.params; // Extraemos los IDs del carrito y del producto
      const { quantity } = req.body;  // Extraemos la nueva cantidad desde el cuerpo de la solicitud

      const product = await productDao.getById(pid); // Verificamos si el producto existe
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      
      const cart = await cartDao.getById(cid); // Verificamos si el carrito existe
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

      const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity)); // Llamamos al servicio para actualizar la cantidad
      res.status(200).json({ status: "ok", payload: cartUpdate });
    } catch (error) {
      // Manejo de errores
      errorLog(error, req);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  // Método para eliminar todos los productos del carrito
  async clearProductsToCart(req = request, res = response) {
    try {
      const { cid } = req.params;  // Extraemos el ID del carrito
      const cart = await cartServices.clearProductsToCart(cid); // Llamamos al servicio para eliminar todos los productos

      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

      res.status(200).json({ status: "ok", cart });
    } catch (error) {
      // Manejo de errores
      errorLog(error, req);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  // Método para realizar la compra del carrito
  async purchaseCart(req = request, res = response) {
    try {
      const { cid } = req.params; // Extraemos el ID del carrito
      const cart = await cartServices.getCartById(cid); // Verificamos si el carrito existe
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

      const total = await cartServices.purchaseCart(cid); // Llamamos al servicio para obtener el total y realizar la compra
      const ticket = await ticketService.createTicket(total, req.user.email); // Creamos el ticket de la compra

      res.status(200).json({ status: "ok", ticket });
    } catch (error) {
      // Manejo de errores
      errorLog(error, req);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }
}

// Exportamos una instancia del controlador
export const cartController = new CartControllers();

