import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequest, loginRequestSchema } from "@counterflow/contracts";
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { loginUser } from "@/api";
import { useAuthStore } from "@/stores/auth.ts";
import { toast } from "@/components/ui/toast.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";

const defaultValues: LoginRequest = {
  login: "",
  password: "",
};

export const LoginForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues,
  });

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const { user } = await loginUser(data);

      setUser(user);

      toast.add({
        type: "success",
        description: `Добро пожаловать, ${user.login}!`,
      });

      navigate("/calculate", { replace: true });
    } catch (error) {
      console.log(error);

      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось войти. Попробуйте ещё раз.",
      });
    }
  };

  return (
    <Card className="gap-6 rounded-2xl pt-6 shadow-sm">
      <CardHeader className="gap-2 px-6">
        <CardTitle>
          <h1 className="text-2xl font-semibold tracking-tight">
            Вход в аккаунт
          </h1>
        </CardTitle>
        <CardDescription className="leading-relaxed">
          Войдите, чтобы сохранять расчёты и открывать свои варианты.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <form
          id="form-login"
          className="grid gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {
            <Controller
              control={control}
              name="login"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-foreground"
                    htmlFor="form-login-input-login"
                  >
                    Логин
                  </FieldLabel>
                  <Input
                    {...field}
                    className="h-11"
                    id="form-login-input-login"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="Введите логин"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          }
          {
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="text-foreground"
                    htmlFor="form-login-input-password"
                  >
                    Пароль
                  </FieldLabel>
                  <Input
                    {...field}
                    className="h-11"
                    id="form-login-input-password"
                    autoComplete="current-password"
                    placeholder="Введите пароль"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          }
        </form>
      </CardContent>
      <CardFooter className="border-0 bg-transparent px-6 pt-0 pb-6">
        <Button
          type="submit"
          form="form-login"
          className="h-11 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Входим…" : "Войти"}
        </Button>
      </CardFooter>
    </Card>
  );
};
