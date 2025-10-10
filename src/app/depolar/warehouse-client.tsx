"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface WarehouseImage {
  id: string;
  warehouse_id: string;
  image_path: string;
}

interface Warehouse {
  id: string;
  title: string;
  description?: string;
  location?: string;
  size?: string;
  price: number;
  rating?: number;
  warehouses_images?: WarehouseImage[];
}

interface WarehouseClientProps {
  warehouses: Warehouse[];
}

export default function WarehouseClient({ warehouses }: WarehouseClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWarehouses = warehouses.filter(warehouse =>
    (warehouse.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (warehouse.title?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
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
          {filteredWarehouses.length > 0 ? (
            filteredWarehouses.map((warehouse) => (
              <Card key={warehouse.id} className="rounded-xl shadow-lg transition-transform transform hover:scale-105 pb-6 pt-0">
                <CardHeader className="p-0 relative">
                  <div className="relative h-60 w-full rounded-t-xl overflow-hidden">
                    <Image
                      src={warehouse.warehouses_images && warehouse.warehouses_images.length > 0
                        ? warehouse.warehouses_images[0].image_path
                        : "https://placehold.co/600x400/E2E8F0/94A3B8?text=Depo+Görseli"
                      }
                      alt={warehouse.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      unoptimized={warehouse.warehouses_images && warehouse.warehouses_images.length > 0}
                    />
                    <div className="absolute top-4 right-4">
                      <Heart
                        className="h-8 w-8 text-white fill-gray-500/50 transition-colors hover:text-red-500 hover:fill-red-500 cursor-pointer"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-lg font-bold">
                      {warehouse.title}
                    </CardTitle>
                    {warehouse.rating && (
                      <div className="flex items-center text-sm font-semibold text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        {warehouse.rating}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {warehouse.location || 'Konum belirtilmemiş'}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">{warehouse.size || 'Boyut belirtilmemiş'}</span> m²
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-md text-gray-700">
                      <span className="font-bold text-lg text-blue-600">₺{warehouse.price}</span> / Ay
                    </span>
                    <Link href={`/depolar/${warehouse.id}`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        Detayları Gör
                      </Button>
                    </Link>
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
  );
}