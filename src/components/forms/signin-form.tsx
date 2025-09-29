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
import { login } from "@/app/giris-yap/action"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "../../../utils/supabase/client"

const initialState = {
  success: false,
  message: undefined,
  redirectTo: undefined,
  validationErrors: undefined,
}

// Wrapper function for useFormState compatibility
async function loginAction(prevState: unknown, formData: FormData) {
  return await login(formData)
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [state, formAction] = useFormState(loginAction, initialState)

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      // Manually trigger client-side auth refresh after server action
      const supabase = createClient()
      supabase.auth.getSession().then(() => {
        router.push(state.redirectTo!)
      })
    }
  }, [state, router])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Hesabınıza giriş yapın</CardTitle>
          <CardDescription>
            Hesabınıza giriş yapmak için aşağıya e-posta adresinizi girin
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Şifre</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Şifrenizi mi unuttunuz?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={state?.validationErrors?.password ? "border-red-500" : ""}
                />
                {state?.validationErrors?.password && (
                  <p className="text-sm text-red-500">{state.validationErrors.password}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Giriş Yap
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                  Google ile giriş yap
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Hesabın yok mu?{" "}
              <a href="/uye-ol" className="underline underline-offset-4">
                Üye ol
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
