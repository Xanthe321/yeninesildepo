import { Package, Scale, Shield, CheckCircle } from "lucide-react";

export default function Services() {
    return (
      <section className="relative py-20 sm:py-24 bg-blue-50 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="w-4 h-4" />
              <span>Neden Yeninesil Depolama?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Güvenilir Hizmet, Sorunsuz Çözüm
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Size özel çözümlerimizle eşyalarınızın güvende olduğundan emin olabilirsiniz. Esnek kiralama seçenekleri, modern tesisler ve 7/24 güvenlik garantisi sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Güvenlik Card */}
            <div className="group relative flex flex-col items-center text-center p-8 lg:p-10 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">Tam Güvenlik</h3>
              <p className="text-gray-600 leading-relaxed">24/7 kamera izleme sistemleri, alarm ve güvenlik personeli ile eşyalarınız daima güvende.</p>
            </div>

            {/* Esneklik Card */}
            <div className="group relative flex flex-col items-center text-center p-8 lg:p-10 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <Scale className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">Esnek Çözümler</h3>
              <p className="text-gray-600 leading-relaxed">İhtiyaçlarınıza özel olarak tasarlanmış, farklı depo boyutları ve esnek kiralama süreleri.</p>
            </div>

            {/* Kolaylık Card */}
            <div className="group relative flex flex-col items-center text-center p-8 lg:p-10 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform shadow-lg">
                <Package className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">Kolay Erişim</h3>
              <p className="text-gray-600 leading-relaxed">Online yönetim paneli ve kolay erişim ile eşyalarınıza dilediğiniz zaman ulaşın.</p>
            </div>
          </div>
        </div>
      </section>
    )
}