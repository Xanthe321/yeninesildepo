import { ChevronRight, Package, Scale, Shield } from "lucide-react";
import { Button } from "./ui/button";

export default function Services() {
    return (
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Size özel çözümlerimizle eşyalarınızın güvende olduğundan emin olabilirsiniz. Esnek kiralama seçenekleri, modern tesisler ve 7/24 güvenlik garantisi sunuyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Güvenlik Card */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
              <Shield className="h-16 w-16 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Tam Güvenlik</h3>
              <p className="mt-2 text-gray-600">24/7 kamera izleme sistemleri, alarm ve güvenlik personeli ile eşyalarınız daima güvende.</p>
            </div>
            
            {/* Esneklik Card */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
              <Scale className="h-16 w-16 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Esnek Çözümler</h3>
              <p className="mt-2 text-gray-600">İhtiyaçlarınıza özel olarak tasarlanmış, farklı depo boyutları ve esnek kiralama süreleri.</p>
            </div>
            
            {/* Kolaylık Card */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
              <Package className="h-16 w-16 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Kolay Erişim</h3>
              <p className="mt-2 text-gray-600">Online yönetim paneli ve kolay erişim ile eşyalarınıza dilediğiniz zaman ulaşın.</p>
            </div>
          </div>
          
          {/* <div className="mt-16 text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
              Hizmetlerimiz Hakkında Daha Fazla Bilgi Edinin
            </Button>
          </div> */}
        </div>
      </section>
    )
}