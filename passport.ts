import passport from 'passport';
import passportJWT, { StrategyOptions } from 'passport-jwt';
import { db } from './db';
import * as dotenv from "dotenv";
dotenv.config()

const secret: string | undefined = process.env.SECRET;


if (!secret) {
  throw new Error('Secret key not found in environment variables');
}

const options: StrategyOptions = {
  secretOrKey: secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new passportJWT.Strategy(options, async (payload: any, done) => {
    try {
      const user = await db.one('SELECT * FROM users WHERE id=$1', payload.id);
      return user ? done(null, user) : done(new Error('User not found'));
    } catch (error) {
      done(error);
    }
  })
);
