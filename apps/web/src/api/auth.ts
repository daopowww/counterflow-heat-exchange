import {
  authResponseSchema,
  currentUserResponseSchema,
  LoginRequest,
  RegisterRequest,
} from "@counterflow/contracts";

export const getCurrentUser = async () => {
  const response = await fetch("/api/auth/me");

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`HTTP Ошибка! Статус: ${response.status}. ${errorText}`);
  }

  const data = await response.json();
  return currentUserResponseSchema.parse(data);
};

export const loginUser = async (data: LoginRequest) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Неверный логин или пароль.");
    }

    throw new Error("Не удалось войти. Попробуйте ещё раз.");
  }

  const dataResponse = await response.json();
  return authResponseSchema.parse(dataResponse);
};

export const registerUser = async (data: RegisterRequest) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("Этот логин уже занят. Попробуйте другой.");
    }

    throw new Error("Не удалось создать аккаунт. Попробуйте ещё раз.");
  }

  const dataResponse = await response.json();
  return authResponseSchema.parse(dataResponse);
};

export const logoutUser = async (): Promise<void> => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось выйти из аккаунта. Попробуйте ещё раз.");
  }
};
