import { Link, useNavigate } from "react-router";
import { LogIn, LogOut } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CalculationParametersSheet } from "@/components/calculation/CalculationParametersSheet";
import { SaveVariantSheet } from "@/components/variant/SaveVariantSheet";
import { useAuthStore } from "@/stores/auth.ts";
import { useLogout } from "@/hooks/useLogout";

export const Header = () => {
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useLogout();
  const user = useAuthStore((state) => state.user);
  const authStatus = useAuthStore((state) => state.status);

  const isCheckingAuth = authStatus === "idle" || authStatus === "loading";

  const handleLogout = async () => {
    const isSuccess = await logout();

    if (isSuccess) {
      void navigate("/login", { replace: true });
    }
  };

  return (
    <header>
      <Card className="flex flex-col gap-4 px-4 xl:flex-row xl:items-center xl:justify-between">
        <CardTitle className="min-w-0">
          <h1 className="wrap-break-word text-2xl font-bold sm:text-3xl">
            Привет, {user?.login ?? "Пользователь"}!
          </h1>
          <div>
            <p className="text-stone-600">Расчёт теплообмена</p>
          </div>
        </CardTitle>
        <CardContent className="shrink-0 px-0">
          <div className="flex flex-wrap items-center gap-3">
            <CalculationParametersSheet />
            {user && <SaveVariantSheet />}
            {isCheckingAuth ? (
              <Button variant="outline" size="lg" disabled>
                Проверяем вход…
              </Button>
            ) : user ? (
              <Button
                variant="outline"
                size="lg"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-busy={isLoggingOut}
              >
                <LogOut aria-hidden="true" />
                {isLoggingOut ? "Выходим…" : "Выйти"}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                render={<Link to="/login" />}
              >
                <LogIn aria-hidden="true" />
                Войти
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </header>
  );
};
