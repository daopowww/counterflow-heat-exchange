import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterRequest, registerRequestSchema } from "@counterflow/contracts";
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { registerUser } from "@/api";
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

const defaultValues: RegisterRequest = {
  login: "",
  password: "",
};

export const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerRequestSchema),
    defaultValues,
  });

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const { user } = await registerUser(data);

      setUser(user);

      toast.add({
        type: "success",
        description: `Аккаунт создан. Добро пожаловать, ${user.login}!`,
      });

      navigate("/calculate", { replace: true });
    } catch (error) {
      console.log(error);

      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось создать аккаунт. Попробуйте ещё раз.",
      });
    }
  };

  return (
    <Card className="gap-6 rounded-2xl pt-6 shadow-sm">
      <CardHeader className="gap-2 px-6">
        <CardTitle>
          <h1 className="text-2xl font-semibold tracking-tight">
            Создать аккаунт
          </h1>
        </CardTitle>
        <CardDescription className="leading-relaxed">
          Сохраняйте свои расчёты и возвращайтесь к ним в любое время.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <form
          id="form-register"
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
                    htmlFor="form-register-input-login"
                  >
                    Логин
                  </FieldLabel>
                  <Input
                    {...field}
                    className="h-11"
                    id="form-register-input-login"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="Придумайте логин"
                    aria-describedby="form-register-login-hint"
                    aria-invalid={fieldState.invalid}
                  />
                  <p
                    id="form-register-login-hint"
                    className="text-xs text-muted-foreground"
                  >
                    От 3 до 32 символов.
                  </p>
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
                    htmlFor="form-register-input-password"
                  >
                    Пароль
                  </FieldLabel>
                  <Input
                    {...field}
                    className="h-11"
                    id="form-register-input-password"
                    autoComplete="new-password"
                    placeholder="Придумайте пароль"
                    aria-describedby="form-register-password-hint"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  <p
                    id="form-register-password-hint"
                    className="text-xs text-muted-foreground"
                  >
                    От 5 до 64 символов.
                  </p>
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
          form="form-register"
          className="h-11 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Создаём аккаунт…" : "Создать аккаунт"}
        </Button>
      </CardFooter>
    </Card>
  );
};
