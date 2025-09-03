import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Storage() {
    return (
			<section className="py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Depo Çeşitlerimiz
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            İhtiyaçlarınıza uygun depo boyutunu seçin ve hemen kiralama işlemine başlayın.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-xl shadow-lg transition-transform transform hover:scale-105">
              <CardHeader>
                <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
                  <Image
                    src="https://placehold.co/400x300/E2E8F0/94A3B8?text=Küçük+Depo"
                    alt="Küçük depo görseli"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 text-left">
                <CardTitle className="text-2xl font-bold">Küçük Boy Depo</CardTitle>
                <p className="mt-2 text-gray-600">Birkaç koli, valiz veya küçük mobilyalar için idealdir.</p>
                <p className="mt-4 text-xl font-bold text-blue-600">₺XXX / Ay</p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                  Incele
                </Button>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-lg transition-transform transform hover:scale-105">
              <CardHeader>
                <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
                  <Image
                    src="https://placehold.co/400x300/E2E8F0/94A3B8?text=Orta+Depo"
                    alt="Orta boy depo görseli"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 text-left">
                <CardTitle className="text-2xl font-bold">Orta Boy Depo</CardTitle>
                <p className="mt-2 text-gray-600">1+1 veya 2+1 daire eşyaları için uygundur.</p>
                <p className="mt-4 text-xl font-bold text-blue-600">₺XXX / Ay</p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                  Incele
                </Button>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-lg transition-transform transform hover:scale-105">
              <CardHeader>
                <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
                  <Image
                    src="https://placehold.co/400x300/E2E8F0/94A3B8?text=Büyük+Depo"
                    alt="Büyük boy depo görseli"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 text-left">
                <CardTitle className="text-2xl font-bold">Büyük Boy Depo</CardTitle>
                <p className="mt-2 text-gray-600">3+1 daire eşyası veya ofis malzemeleri için geniş alan.</p>
                <p className="mt-4 text-xl font-bold text-blue-600">₺XXX / Ay</p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                  Incele
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
}