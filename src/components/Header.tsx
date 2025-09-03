import { Package } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() { 
    return (
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Depo.com</span>
          </a>

          {/* Navigation and Buttons */}
          <nav className="flex items-center space-x-4">
            <ul className="hidden md:flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Ana Sayfa</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Depolar</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">İletişim</a></li>
            </ul>
            <Button variant="ghost" className="hidden sm:inline-flex">Giriş Yap</Button>
            <Button className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700">Kayıt Ol</Button>
          </nav>
        </div>
      </header>
    )

}