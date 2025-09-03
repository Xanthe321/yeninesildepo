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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form>
            <div className="flex flex-col gap-6">
              {/* Ad Soyad */}
              <div className="grid gap-3">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Adınızı ve soyadınızı girin"
                  required
                />
              </div>

              {/* Kullanıcı Adı */}
              <div className="grid gap-3">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="örn. emreoztrk"
                  required
                />
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Şifre */}
              <div className="grid gap-3">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>

              {/* Şifre Doğrulama */}
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Şifreyi Doğrula</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Şifrenizi tekrar girin"
                  required
                />
              </div>

              {/* Butonlar */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Üye Ol
                </Button>
                <Button variant="outline" className="w-full">
                  Google ile üye ol
                </Button>
              </div>
            </div>

            {/* Zaten hesabın varsa */}
            <div className="mt-4 text-center text-sm">
              Zaten hesabın var mı?{" "}
              <a href="/giris" className="underline underline-offset-4">
                Giriş Yap
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
