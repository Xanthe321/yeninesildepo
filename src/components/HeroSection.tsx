import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        {/* Subtly animated background shape */}
        <div className="absolute top-0 right-0 h-64 w-64 md:h-96 md:w-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse-slow"></div>
      
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              <span className="text-blue-600">Depolama</span> Problemlerinize Kesin Çözüm
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-700">
              Fazla eşyalarınız için aradığınız güvenli, temiz ve uygun fiyatlı depo alanları tek tıkla kapınızda. İhtiyaçlarınıza özel esnek çözümlerle hayatınızı kolaylaştırın.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                Depoları Keşfet
              </Button>
              <Button size="lg" variant="outline" className="text-blue-600 hover:bg-blue-100 border-2 border-blue-600 font-semibold py-3 px-8 rounded-full transition-colors">
                Nasıl Çalışır?
              </Button>
            </div>
          </div>
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://placehold.co/800x600/E2E8F0/94A3B8?text=Modern+Depo+İçi"
              alt="Modern depo içi görseli"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}