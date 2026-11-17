import { z } from "zod";

export const authUserSchema = z.object({
  id: z.int().positive(),
  login: z.string(),
});

export const registerRequestSchema = z.object({
  login: z
    .string()
    .trim()
    .min(3, "Логин должен содержать не менее 3 символов")
    .max(32, "Логин должен содержать не более 32 символов"),
  password: z
    .string()
    .min(5, "Пароль должен содержать не менее 5 символов")
    .max(64, "Пароль должен содержать не более 64 символов"),
});

export const loginRequestSchema = z.object({
  login: z.string().trim().min(1, "Введите логин"),
  password: z
    .string()
    .min(5, "Пароль должен содержать не менее 5 символов")
    .max(64, "Пароль должен содержать не более 64 символов"),
});

export const authResponseSchema = z.object({
  user: authUserSchema,
});

export const currentUserResponseSchema = z.object({
  user: authUserSchema.nullable(),
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type CurrentUserResponse = z.infer<typeof currentUserResponseSchema>;
