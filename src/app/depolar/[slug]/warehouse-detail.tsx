"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { ChevronLeft, ChevronRight, MapPin, Package, Star } from "lucide-react";
import { useState } from "react";
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
  location: string;
  size: string;
  price: number;
  rating?: number;
  warehouses_images?: WarehouseImage[];
  features?: string[];
}

interface WarehouseDetailProps {
  warehouse: Warehouse;
}

export default function WarehouseDetail({ warehouse }: WarehouseDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const defaultImages = [
    "https://placehold.co/1200x800/E2E8F0/94A3B8?text=Ana+Depo+Görseli",
    "https://placehold.co/1200x800/E2E8F0/94A3B8?text=Depo+İçi+Görünüm",
    "https://placehold.co/1200x800/E2E8F0/94A3B8?text=Güvenlik+Sistemi",
    "https://placehold.co/1200x800/E2E8F0/94A3B8?text=Depo+Koridoru"
  ];

  const defaultFeatures = [
    "24/7 Kamera İzleme",
    "İklim Kontrolü",
    "Hırsız Alarm Sistemi",
    "Yangın Söndürme Sistemi",
    "Kolay Ulaşım İmkanı",
    "Esnek Kiralama Süreleri"
  ];

  const images = warehouse.warehouses_images && warehouse.warehouses_images.length > 0
    ? warehouse.warehouses_images.map(img => img.image_path)
    : defaultImages;
  const features = warehouse.features && warehouse.features.length > 0 ? warehouse.features : defaultFeatures;

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white text-gray-900 font-sans leading-relaxed antialiased min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{warehouse.title}</h1>
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            {warehouse.rating && (
              <>
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-semibold">{warehouse.rating}</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
              </>
            )}
            <MapPin className="h-4 w-4 mr-1" />
            <span>{warehouse.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Slider and Thumbnails Section */}
          <div className="lg:col-span-1">
            <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg h-96">
              <Image
                src={images[currentImageIndex]}
                alt={warehouse.title}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                unoptimized={warehouse.warehouses_images && warehouse.warehouses_images.length > 0}
              />
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800 p-2 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800 p-2 rounded-full transition-colors z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105 ${
                    index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${warehouse.title} - Görsel ${index + 1}`}
                    width={200}
                    height={300}
                    className="w-full object-cover aspect-[2/3]"
                    unoptimized={warehouse.warehouses_images && warehouse.warehouses_images.length > 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details and Booking Section */}
          <div className="lg:col-span-1 flex flex-col space-y-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Açıklama</h2>
              <p className="text-gray-700 mb-6">
                {warehouse.description || "Bu depo, eşyalarınız için güvenli ve temiz bir saklama alanı sunar. Profesyonel depolama hizmetlerimizle eşyalarınızı güvenle emanet edebilirsiniz."}
              </p>

              <h2 className="text-2xl font-bold mb-4">Özellikler</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-6 h-fit rounded-xl shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl font-bold text-blue-600">₺{warehouse.price}<span className="text-base text-gray-500 font-normal"> / Ay</span></CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex justify-between items-center mb-4">
                  {warehouse.rating && (
                    <div className="flex items-center text-sm font-semibold text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      {warehouse.rating} puan
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{warehouse.size}</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Hemen Kirala</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}