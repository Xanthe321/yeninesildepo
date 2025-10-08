import { Package, Scale, Shield, CheckCircle, ArrowRight } from "lucide-react";

export default function HowToWork() {
    return (
        <section id="how-to-work" className="relative py-20 sm:py-24 bg-blue-50 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            <span>Kolay ve Hızlı Süreç</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Nasıl Çalışır?
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sadece 3 basit adımda eşyalarınızı depolamaya başlayın.
          </p>

          <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting arrows - hidden on mobile */}
            <div className="hidden md:block absolute top-16 left-1/3 w-24 lg:w-32">
              <ArrowRight className="w-full h-8 text-blue-300" />
            </div>
            <div className="hidden md:block absolute top-16 right-1/3 w-24 lg:w-32">
              <ArrowRight className="w-full h-8 text-blue-300" />
            </div>

            {/* Step 1 */}
            <div className="flex flex-col items-center relative">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <Scale className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">Boyutu Seçin</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">İhtiyaçlarınıza en uygun depo boyutunu belirleyin.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">Rezervasyon Yapın</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">Web sitemizden kolayca online rezervasyonunuzu tamamlayın.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <Package className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">Eşyalarınızı Taşıyın</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">Eşyalarınızı depoya getirin ve güvenle saklayın.</p>
            </div>
          </div>
        </div>
      </section>
    )
}