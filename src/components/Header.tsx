"use client";

import { Package, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

interface UserData {
  id: string;
  email: string;
  role?: string;
}

export default function Header() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fetch user data from secure API endpoint
    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/auth/user', {
                method: 'GET',
                credentials: 'same-origin'
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Auth state management with onAuthStateChange
    useEffect(() => {
        const supabase = createClient();

        // Set a timeout to prevent infinite loading
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            clearTimeout(timeout);

            if (event === 'SIGNED_IN' && session?.user) {
                // Fetch complete user data including role from secure API
                await fetchUserData();
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setLoading(false);
            }
        });

        // Initial auth check
        fetchUserData();

        return () => {
            clearTimeout(timeout);
            subscription.unsubscribe();
        };
    }, []);


    // Close mobile menu on window resize to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (mobileMenuOpen && !target.closest('header')) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            // Prevent body scroll when mobile menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

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

            {loading ? (
              <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-full"></div>
            ) : user ? (
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {loading ? (
              <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-full"></div>
            ) : user ? (
              <UserDropdown user={user} />
            ) : null}

            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t shadow-lg animate-in slide-in-from-top-2 duration-200">
              {/* Mobile Navigation Links */}
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/depolar"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Depolar
              </Link>
              <Link
                href="/iletisim"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                İletişim
              </Link>

              {/* Mobile Auth Buttons */}
              {!user && !loading && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex space-x-3 px-3">
                    <Link href="/giris-yap" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full cursor-pointer">
                        Giriş Yap
                      </Button>
                    </Link>
                    <Link href="/uye-ol" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        Kayıt Ol
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    )

}