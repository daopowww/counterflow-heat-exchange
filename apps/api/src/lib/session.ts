import "dotenv/config";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

const sessionSecret = process.env.SESSION_SECRET;
const databaseUrl = process.env.DATABASE_URL;

if (!sessionSecret || !databaseUrl) {
  throw new Error("Не заданы SESSION_SECRET или DATABASE_URL");
}

const PgSessionStore = connectPgSimple(session);

export const sessionMiddleware = session({
  secret: sessionSecret,
  store: new PgSessionStore({
    conString: databaseUrl,
    createTableIfMissing: true,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});
