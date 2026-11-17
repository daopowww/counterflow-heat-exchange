import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useAuthStore } from "@/stores/auth.ts";

export const AuthError = () => {
  const loadCurrentUser = useAuthStore((state) => state.loadCurrentUser);

  return (
    <main className="grid min-h-svh place-items-center bg-background p-6">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <CircleAlert
          className="size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <div role="alert" className="space-y-2">
          <h1 className="text-lg font-medium">Не удалось проверить вход</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Проверьте подключение и попробуйте ещё раз.
          </p>
        </div>
        <Button variant="outline" onClick={() => void loadCurrentUser()}>
          Повторить
        </Button>
      </div>
    </main>
  );
};
