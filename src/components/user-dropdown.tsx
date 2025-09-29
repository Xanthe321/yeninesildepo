"use client";

import { User, Settings, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import { createClient } from "../../utils/supabase/client";

interface UserDropdownProps {
  user: {
    id: string;
    email: string;
    role?: string;
  };
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Trigger client-side logout first to update header immediately
      const supabase = createClient();
      await supabase.auth.signOut();

      // Then call server action for cleanup
      await signOut();
    } catch (error) {
      // If server action fails, fallback to client-side signout
      router.push('/');
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-blue-500">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Hoş geldiniz</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profil" className="cursor-pointer flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>

        {user.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link href="/yonetim-paneli" className="cursor-pointer flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Paneli</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}