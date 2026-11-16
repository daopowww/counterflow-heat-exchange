import express from "express";
import {
  AuthResponse,
  CurrentUserResponse,
  loginRequestSchema,
  registerRequestSchema,
} from "@counterflow/contracts";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

export const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const parsedData = registerRequestSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      errors: parsedData.error.issues,
    });
  }

  try {
    const passwordHash = await hashPassword(parsedData.data.password);

    const user = await prisma.user.create({
      data: { login: parsedData.data.login, passwordHash },
      select: { id: true, login: true },
    });

    req.session.regenerate((error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Не удалось создать сессию" });
      }

      req.session.userId = user.id;

      req.session.save((error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Не удалось сохранить сессию" });
        }

        const result: AuthResponse = { user };

        return res.status(201).json(result);
      });
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        error: "Этот логин уже занят",
      });
    }

    console.error(error);

    return res.status(500).json({
      error: "Не удалось зарегистрироваться",
    });
  }
});

authRouter.get("/me", async (req, res) => {
  const userId = req.session.userId;

  if (userId === undefined) {
    return res.status(200).json({ user: null });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, login: true },
    });

    const result: CurrentUserResponse = { user };
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);

    return res.status(500).json({ error: "Ошибка получения пользователя" });
  }
});

authRouter.post("/login", async (req, res) => {
  const parsedData = loginRequestSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ errors: parsedData.error.issues });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        login: parsedData.data.login,
      },
      select: {
        id: true,
        login: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const isPasswordValid = await verifyPassword(
      user.passwordHash,
      parsedData.data.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    req.session.regenerate((error) => {
      if (error) {
        console.error(error);

        return res.status(500).json({ error: "Ошибка создания сессии" });
      }

      req.session.userId = user.id;

      req.session.save((error) => {
        if (error) {
          console.error(error);

          return res.status(500).json({ error: "Не удалось сохранить сессию" });
        }

        const result: AuthResponse = {
          user: {
            id: user.id,
            login: user.login,
          },
        };

        return res.status(200).json(result);
      });
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error)
        return res.status(500).json({ error: "Ошибка удалении сессии" });

      res.clearCookie("connect.sid", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      return res.status(204).end();
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ error: "Ошибка сервера" });
  }
});
