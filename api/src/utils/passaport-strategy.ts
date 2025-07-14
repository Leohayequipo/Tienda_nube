import passport from "passport";
import passportJWT from "passport-jwt";
import { userRepository } from "@repository";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || "THE_SECRET", // Usá la misma clave que se usa para firmar el token
      algorithms: ["HS256"],
    },
    (jwtPayload, done) => {
      console.log("JWT recibido:", jwtPayload);
      const userId = jwtPayload.storeId || jwtPayload.user_id;
      console.log("Buscando userId en db.json:", userId);
      const user = userRepository.findOne(userId);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }
  )
);
