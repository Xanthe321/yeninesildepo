"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/app/uye-ol/action"
import { useFormState } from "react-dom"

const initialState = {
  success: false,
  message: undefined,
  redirectTo: undefined,
  validationErrors: undefined,
}

// Wrapper function for useFormState compatibility
async function signUpAction(prevState: unknown, formData: FormData) {
  return await signUp(formData)
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useFormState(signUpAction, initialState)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Üye Ol</CardTitle>
          <CardDescription>
            Hemen başlamak için aşağıdaki bilgileri doldurun.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              {/* Server Messages */}
              {!state?.success && state?.message && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {state.message}
                </div>
              )}
              {state?.success && state?.message && (
                <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                  {state.message}
                </div>
              )}

              {/* Ad Soyad */}
              <div className="grid gap-3">
                <Label htmlFor="fullName">Ad Soyad</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Adınızı ve soyadınızı girin"
                  required
                  className={state?.validationErrors?.fullName ? "border-red-500" : ""}
                />
                {state?.validationErrors?.fullName && (
                  <p className="text-sm text-red-500">{state.validationErrors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className={state?.validationErrors?.email ? "border-red-500" : ""}
                />
                {state?.validationErrors?.email && (
                  <p className="text-sm text-red-500">{state.validationErrors.email}</p>
                )}
              </div>

              {/* Şifre */}
              <div className="grid gap-3">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="En az 6 karakter, büyük/küçük harf ve rakam"
                  required
                  className={state?.validationErrors?.password ? "border-red-500" : ""}
                />
                {state?.validationErrors?.password && (
                  <p className="text-sm text-red-500">{state.validationErrors.password}</p>
                )}
              </div>

              {/* Şifre Doğrulama */}
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Şifreyi Doğrula</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Şifrenizi tekrar girin"
                  required
                  className={state?.validationErrors?.confirmPassword ? "border-red-500" : ""}
                />
                {state?.validationErrors?.confirmPassword && (
                  <p className="text-sm text-red-500">{state.validationErrors.confirmPassword}</p>
                )}
              </div>

              {/* Butonlar */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Üye Ol
                </Button>
              </div>
            </div>

            {/* Zaten hesabın varsa */}
            <div className="mt-4 text-center text-sm">
              Zaten hesabın var mı?{" "}
              <a href="/giris-yap" className="underline underline-offset-4">
                Giriş Yap
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
