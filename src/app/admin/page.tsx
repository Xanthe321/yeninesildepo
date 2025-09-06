import { AdminSigninForm } from "@/components/forms/admin-signin-form";

export default function AdminPage() {
  return (
    <div className="flex min-h-[calc(100svh-68px)] w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <AdminSigninForm />
          </div>
        </div>   
  )
}