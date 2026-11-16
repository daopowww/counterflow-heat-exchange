import { z } from "zod";

export const authUserSchema = z.object({
  id: z.int().positive(),
  login: z.string(),
});

export const registerRequestSchema = z.object({
  login: z.string().trim().min(3).max(32),
  password: z.string().min(5).max(64),
});

export const loginRequestSchema = z.object({
  login: z.string().trim(),
  password: z.string().min(5).max(64),
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
