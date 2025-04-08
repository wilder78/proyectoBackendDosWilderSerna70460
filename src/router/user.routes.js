import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { userExist } from "../middlewares/existUser.middleware.js";

const router = Router();

// Empoy to consult all users --//-- Empoy para consultar a todos los usuarios.
router.get("/", async (req, res) => {
  try {
    const user = await userDao.getAll();
    res.status(200).json({ status: "ok", user})

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error"});
  } 
})

// Empoy to register user. --//-- Emplear para registrar usuario.
router.post("/", async (req, res) => {
  try {
    const user = await userDao.create(req.body);
    res.status(201).json({status: "ok", user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error"});
  }
})

// Empoy to search by id. --//-- Empoy para buscar por id.
router.get("/:id", userExist, async (req, res) => {
  try {
    const user = await userDao.getOne({_id: req.params.id})
    res.status(200).json({ status: "ok", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Empoy to update by id. --//-- Emplear para actualizar por id.
router.put("/:id", userExist, async (req, res) => {
  try {

    const userUpdate = await userDao.update(req.params.id, req.body);
    res.status(200).json({ status: "ok", userUpdate});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error"});
  }
})

// Empoy to delete by id. --//-- Empoy para eliminar por id.
router.delete("/:id", userExist, async (req, res) => {
  try {

    await userDao.remove(req.params.id);
    res.status(200).json({ status: "ok", message: `User id ${req.params.id} delete`});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error"});
  }
})

export default router;