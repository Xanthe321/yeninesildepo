import { Package, Scale, Shield } from "lucide-react";

export default function HowToWork() {
    return (
        <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Nasıl Çalışır?
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Sadece 3 basit adımda eşyalarınızı depolamaya başlayın.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                <Scale className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">1. Boyutu Seçin</h3>
              <p className="mt-2 text-gray-600">İhtiyaçlarınıza en uygun depo boyutunu belirleyin.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">2. Rezervasyon Yapın</h3>
              <p className="mt-2 text-gray-600">Web sitemizden kolayca online rezervasyonunuzu tamamlayın.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                <Package className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">3. Eşyalarınızı Taşıyın</h3>
              <p className="mt-2 text-gray-600">Eşyalarınızı depoya getirin ve güvenle saklayın.</p>
            </div>
          </div>
        </div>
      </section>
    )
}