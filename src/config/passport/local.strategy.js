import passport from "passport";
import { Strategy } from "passport-local";
import { userDao } from "../../persistence/mongo/dao/user.dao.js";
import { comparePassword, hasPassword } from "../../utils/hasPassword.utils.js";

// Estrategia de registro
const registerStrategy = new Strategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req, username, password, done) => {
    try {
      const user = await userDao.getOne({ email: username });
      if (user) return done(null, false, { message: "El usuario ya existe." });
      // console.log(req.body);

      // Si el usuario no esta registrado, procedemos a registrarlo.
      const newUser = {
        ...req.body,
        passport: hasPassword(password),
      };

      const userCreate = await userDao.create(newUser);

      return done(null, userCreate);
    } catch (error) {
      done(error);
    }
  }
);

// Registrar la estrategia de login.
passport.use("register", registerStrategy);

// Estrategia de login
const loginStrategy = new Strategy(
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      
      const user = await userDao.getOne({ email: username });
      if(!user || !comparePassword(user.password, password)) return done(null, false, { message: "email o password no válidos."});
      
      // En caso de que las credenciales esten bien.
      return done(null, user);

    } catch (error) {
      done(error)
    }
  }
)

//  Registramos la estrategia de login en passport.
passport.use("login", loginStrategy);

// Serialización --//-- Serialization.
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserializar --//-- Deserialize.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDao.getOne({ _id: id });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
