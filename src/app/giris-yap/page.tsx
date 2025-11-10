import { LoginForm } from "@/components/forms/signin-form";


export default function Giris() {
  return(
  <div className="flex min-h-[calc(100svh-68px)] w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-white to-blue-50">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>   
  )
}