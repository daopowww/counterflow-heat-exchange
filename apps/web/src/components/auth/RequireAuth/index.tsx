import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/stores/auth.ts";
import { AuthLoading } from "@/components/auth/AuthLoading";
import { AuthError } from "@/components/auth/AuthError";

type RequireAuthProps = {
  children: ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);

  if (status === "idle" || status === "loading") {
    return <AuthLoading />;
  }

  if (status === "error") {
    return <AuthError />;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
