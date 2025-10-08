import Image from "next/image";
import { Button } from "./ui/button";
import { Package, Shield, Clock } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-16 sm:py-24 lg:py-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-start text-left space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Package className="w-4 h-4" />
                <span>Güvenilir Depolama Çözümleri</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Eşyalarınız İçin
                <span className="block text-blue-600 mt-2">Güvenli Alan</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Fazla eşyalarınız, ofis malzemeleriniz veya mevsimlik ürünleriniz için esnek ve uygun fiyatlı depolama alanları. Dilediğiniz süre, dilediğiniz boyutta.
              </p>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">7/24 Güvenlik</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Esnek Süreler</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Tüm Boyutlar</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/depolar">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    Depoları İncele
                  </Button>
                </Link>
                <Link href="#how-to-work">
                  <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 font-semibold px-8 transition-all cursor-pointer">
                    Nasıl Çalışır?
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl transform rotate-3"></div>
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    width={800}
                    height={800}
                    src="/hero-section-image.jpg"
                    alt="Modern depo içi görseli"
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}