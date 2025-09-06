import { LoginForm } from "@/components/forms/signin-form";
import Header from "@/components/Header";

export default function Giris() {
  return(
  <div className="flex min-h-[calc(100svh-68px)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>   
  )
}