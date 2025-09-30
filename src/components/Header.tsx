import { Package } from "lucide-react";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

interface UserData {
  id: string;
  email: string;
  role?: string;
}

interface HeaderProps {
  user: UserData | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">Yeninesil Depolama</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Ana Sayfa</Link></li>
            <li><Link href="/depolar" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Depolar</Link></li>
            <li><Link href="/iletisim" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">İletişim</Link></li>
          </ul>

          {user ? (
            <div className="flex items-center space-x-2">
              <UserDropdown user={user} />
            </div>
          ) : (
            <>
              <Link href="/giris-yap">
                <Button variant="ghost" className="cursor-pointer">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/uye-ol">
                <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  Kayıt Ol
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          {user && <UserDropdown user={user} />}
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
}