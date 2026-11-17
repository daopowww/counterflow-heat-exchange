import { Link } from "react-router";
import { LoginForm } from "@/components/auth/LoginForm";
import { ArrowLeft } from "lucide-react";

export const LoginPage = () => {
  return (
    <main className="grid min-h-svh place-items-center bg-background px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Расчёт теплообмена
        </p>
        <LoginForm />
        <div className="space-y-4 text-center text-sm">
          <p className="text-muted-foreground">
            Нет аккаунта?{" "}
            <Link
              to="/register"
              className="rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Создать аккаунт
            </Link>
          </p>
          <Link
            to="/calculate"
            className="inline-flex items-center gap-2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />К расчёту без
            входа
          </Link>
        </div>
      </div>
    </main>
  );
};
