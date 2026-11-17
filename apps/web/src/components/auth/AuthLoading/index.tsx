import { Spinner } from "@/components/ui/spinner.tsx";

export const AuthLoading = () => {
  return (
    <main className="grid min-h-svh place-items-center p-6">
      <div className="flex max-w-sm flex-col items-center gap-3 text-center">
        <Spinner
          className="size-6 text-muted-foreground"
          aria-label="Проверяем вход"
        />
        <h1 className="text-lg font-medium">Проверяем вход</h1>
        <p className="text-sm text-muted-foreground">
          Загружаем данные вашего аккаунта.
        </p>
      </div>
    </main>
  );
};
