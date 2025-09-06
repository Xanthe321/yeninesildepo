"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Package, Star } from "lucide-react";
import { useState } from "react";


const mockDepolar = [
  {
    id: 1,
    image: "https://placehold.co/600x400/E2E8F0/94A3B8?text=Geniş+Depo",
    title: "Geniş ve Güvenli Depo",
    description: "Tüm eşyalarınız için yeterli alana sahip, son teknolojiyle donatılmış güvenli depo.",
    location: "İstanbul, Ataşehir",
    size: "15 m²",
    price: 850,
    rating: 4.8,
    isLiked: false,
  },
  {
    id: 2,
    image: "https://placehold.co/600x400/E2E8F0/94A3B8?text=Merkezi+Konum",
    title: "Merkezi Konumda Küçük Depo",
    description: "Şehir merkezinde, eşyalarınız için pratik ve hızlı bir çözüm.",
    location: "Ankara, Çankaya",
    size: "5 m²",
    price: 350,
    rating: 4.5,
    isLiked: true,
  },
  {
    id: 3,
    image: "https://placehold.co/600x400/E2E8F0/94A3B8?text=Uygun+Fiyat",
    title: "Uygun Fiyatlı Ev Eşyası Deposu",
    description: "Bütçe dostu, temiz ve kullanışlı ev eşyası depolama alanı.",
    location: "İzmir, Karşıyaka",
    size: "10 m²",
    price: 600,
    rating: 4.9,
    isLiked: false,
  },
  {
    id: 4,
    image: "https://placehold.co/600x400/E2E8F0/94A3B8?text=Kurumsal+Çözüm",
    title: "Kurumsal Depolama Alanı",
    description: "İşletmenizin evrakları ve malzemeleri için geniş ve güvenilir depo çözümü.",
    location: "İstanbul, Maslak",
    size: "25 m²",
    price: 1200,
    rating: 4.7,
    isLiked: true,
  },
  {
    id: 5,
    image: "https://placehold.co/600x400/E2E8F0/94A3B8?text=Küçük+Depo",
    title: "Küçük ve Pratik Depo",
    description: "Ekstra kutularınız veya hobi malzemeleriniz için ideal, küçük ve kullanışlı depo.",
    location: "İstanbul, Kadıköy",
    size: "4 m²",
    price: 300,
    rating: 4.6,
    isLiked: false,
  },
  {
    id: 6,
    image: "https://placehold.co/600x400/E2E8F0/94A3B8?text=Hobi+Deposu",
    title: "Hobi ve Özel Eşya Deposu",
    description: "Hassas eşyalarınızı korumak için iklim kontrollü ve özel güvenlikli depo.",
    location: "İzmir, Alsancak",
    size: "8 m²",
    price: 550,
    rating: 4.9,
    isLiked: false,
  },
];

export default function Depolar() {

  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDepolar = mockDepolar.filter(depo =>
    depo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    depo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Kiralık Depo Seçeneklerimiz</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            İhtiyaçlarınıza ve bütçenize uygun depoyu bulmak için geniş seçeneklerimizi keşfedin.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-10 max-w-lg mx-auto">
          <Input 
            type="text" 
            placeholder="Şehir, bölge veya depo adı ara..." 
            className="w-full rounded-full py-2 px-6 shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-0">
          {filteredDepolar.length > 0 ? (
            filteredDepolar.map((depo) => (
              <Card key={depo.id} className="rounded-xl shadow-lg transition-transform transform hover:scale-105">
                <CardHeader className="p-0 relative">
                  <div className="relative h-60 w-full rounded-t-xl overflow-hidden">
                    <img 
                      src={depo.image} 
                      alt={depo.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-4 right-4">
                      <Heart 
                        className={`h-8 w-8 transition-colors ${depo.isLiked ? 'text-red-500 fill-red-500' : 'text-white fill-gray-500/50'}`} 
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-lg font-bold">
                      {depo.title}
                    </CardTitle>
                    <div className="flex items-center text-sm font-semibold text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      {depo.rating}
                    </div>
                  </div>
                  {/* <CardDescription className="text-gray-500 text-sm mt-2">
                    {depo.description}
                  </CardDescription> */}
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {depo.location}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">{depo.size}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-md text-gray-700">
                      <span className="font-bold text-lg text-blue-600">₺{depo.price}</span> / Ay
                    </span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Detayları Gör
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              Aradığınız kriterlere uygun depo bulunamadı.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}