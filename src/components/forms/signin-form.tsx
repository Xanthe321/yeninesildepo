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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
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
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Giriş Yap
                </Button>
                <Button variant="outline" className="w-full">
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
