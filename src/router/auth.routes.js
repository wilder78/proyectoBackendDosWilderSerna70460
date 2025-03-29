import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const {email, pasword} = req.body;
        const user = await userDao.getOne({ email, pasword });
        if(!user) return res.status(401).json({ message: "Email o password invalido"});
        // Elimanamos la contraseña
        delete user.password;

        res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal Server Error"});
    }
})

router.post("/register", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userDao.getOne({ email });
      if (user) return res.status(400).json({ message: "Ya hay un usuario registrado con ese email" });
  
      // Crear un nuevo usuario
      const newUser = await userDao.create(req.body);
  
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });

export default router;
